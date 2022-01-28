require("dotenv").config();
import { createServer } from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import { graphqlUploadExpress } from "graphql-upload";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { typeDefs, resolvers } from "./schema";
import { getUser } from "./api/users/users.utils";

const startExpressApolloServer = async () => {
  const PORT = process.env.PORT;

  const app = express();
  //  httpServer < app - apollo < express
  app.use(
    logger("tiny"),
    graphqlUploadExpress("/graphql", { maxFileSize: 10000000, maxFiles: 10 })
  );
  //          URL                      폴더  - 해당 폴더에 지정된 URL을 통해 접근하도록 함
  app.use("/uploads", express.static("uploads"));
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
    //playground: true,
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
  await apollo.start();

  apollo.applyMiddleware({ app, path: "/" });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(connectionParams, webSocket, context) {
        console.log("connectionParams: ", connectionParams);
        console.log("webSoket: ", webSocket);
        console.log("context: ", context);
        if (connectionParams.token) {
          return {
            loggedInUser: await getUser(connectionParams.token),
          };
          throw new Error("Missing auth token!");
        }
      },
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
