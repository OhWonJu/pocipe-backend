import client from "../../../client";
import { NEW_COMMENT } from "../../../constents";
import pubsub from "../../../pubsub";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { recipeId, content }, { loggedInUser }) => {
  const recipe = await client.recipe.findUnique({
    where: {
      id: recipeId,
    },
    select: {
      id: true,
    },
  });
  if (!recipe) {
    return {
      ok: false,
      error: "Recipe not found.",
    };
  }
  const newComment = await client.comment.create({
    data: {
      content,
      recipe: {
        connect: {
          id: recipeId,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  pubsub.publish(NEW_COMMENT, { commentUpdates: { ...newComment } });
  if (newComment) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "create comment is failed.",
    };
  }
};

export default {
  Mutation: {
    createComment: protectedResolver(resolver),
  },
};
