require("dotenv").config();
import { createServer } from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { graphqlUploadExpress } from "graphql-upload";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { typeDefs, resolvers } from "./schema"
import { getUser } from "./api/users/users.utils";

const startExpressApolloServer = async () => {
  const PORT = process.env.PORT;
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    playground: true,
    introspection: true,
    uploads: false,
    context: async ({ req, connection }) => {
      if (req) {
        // for http protocol
        return {
          loggedInUser: await getUser(req.headers.token),
        };
      } else {
        // for ws protocal
        const { context } = connection;
        return {
          loggedInUser: context.loggedInUser,
        };
      }
    },
    // subscriptions: {
    //   // for ws
    //   onConnect: async ({ token }) => {
    //     // param == http header
    //     // if (!token) {
    //     //   // 모든 subscriptions가 private인 경우...
    //     //   // plat은 all private이 아닌데..
    //     //   throw new Error("You are not authenticated.");
    //     // }
    //     if (token) {
    //       return {
    //         loggedInUser: await getUser(token),
    //       };
    //     }
    //   },
    // },
  });

  const app = express();
  //  httpServer < app - apollo < express
  app.use(
    logger("tiny"),
    graphqlUploadExpress("/graphql", { maxFileSize: 10000000, maxFiles: 10 })
  );
  //          URL                      폴더
  app.use("/uploads", express.static("uploads"));
  const httpServer = createServer(app);
  //apollo.installSubscriptionHandlers(httpServer);

  await apollo.start();
  apollo.applyMiddleware({ app, path: "/" });

  const subscriptionServer = SubscriptionServer.create(
    {
      typeDefs,
      resolvers,
      execute,
      subscribe,
      onConnect: async ({ token }) => {
        if (token) {
          return {
            loggedInUser: await getUser(token),
          };
        }
      },
    },
    {
      server: httpServer,
      path: apollo.graphqlPath,
    }
  );

  ["SIGINT", "SIGTERM"].forEach(signal => {
    process.on(signal, () => subscriptionServer.close());
  });

  httpServer.listen(PORT, () => {
    console.log(`Server is RUNNING on http://localhost:${PORT}/`);
  });
};

startExpressApolloServer();
