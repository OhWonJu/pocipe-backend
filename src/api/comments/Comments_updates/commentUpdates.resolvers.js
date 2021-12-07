import { withFilter } from "graphql-subscriptions";
import client from "../../../client";
import { NEW_COMMENT } from "../../../constents";
import pubsub from "../../../pubsub";

const resolver = async (root, args, context, info) => {
  // 나의 레시피에 코멘트가 생길 경우..
  // 해당 코멘트 작성자가 내가 아닌 경우.
  return withFilter(
    () => pubsub.asyncIterator(NEW_COMMENT),
    async (payload, _, { loggedInUser }) => {
      const recipe = await client.recipe.findFirst({
        where: {
          id: payload.commentUpdates.recipeId,
          chefId: loggedInUser.id,
        },
        select: {
          chefId: true,
        },
      });
      if (recipe && payload.commentUpdates.userId != loggedInUser.id) {
        return true;
      } else {
        return false;
      }
    }
  )(root, args, context, info);
};

export default {
  Subscription: {
    commentUpdates: {
      subscribe: resolver,
    },
  },
};
