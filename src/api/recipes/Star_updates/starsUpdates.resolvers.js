import { withFilter } from "graphql-subscriptions";
import client from "../../../client";
import { NEW_STAR } from "../../../constents";
import pubsub from "../../../pubsub";

const resolver = async (root, args, context, info) => {
  return withFilter(
    () => pubsub.asyncIterator(NEW_STAR),
    async (payload, _, { loggedInUser }) => {
      const recipe = await client.recipe.findFirst({
        where: {
          id: payload.starsUpdates.recipeId,
          chefId: loggedInUser.id,
        },
        select: {
          chefId: true,
        },
      });
      if (recipe) {
        return true;
      } else {
        return false;
      }
    }
  )(root, args, context, info);
};

export default {
  Subscription: {
    starsUpdates: {
      subscribe: resolver,
    },
  },
};
