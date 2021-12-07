import { withFilter } from "graphql-subscriptions";
import client from "../../../client";
import { NEW_RECIPE } from "../../../constents";
import pubsub from "../../../pubsub";

const resolver = async (root, args, context, info) => {
  return withFilter(
    () => pubsub.asyncIterator(NEW_RECIPE),
    async (payload, _, { loggedInUser }) => {
      const user = await client.user.findFirst({
        where: {
          id: loggedInUser.id,
        },
        select: {
          subscribings: true,
        },
      });
      if (!user) {
        return false;
      }
      const subscribings = user.subscribings.map(user => user.id);
      const isSubscribing = subscribings.includes(payload.recipeUpdates.chefId);
      if (isSubscribing) {
        return true;
      } else {
        return false;
      }
    }
  )(root, args, context, info);
};

export default {
  Subscription: {
    recipeUpdates: {
      subscribe: resolver,
    },
  },
};
