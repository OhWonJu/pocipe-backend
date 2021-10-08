import client from "../../../client";
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
  await client.comment.create({
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
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    createComment: protectedResolver(resolver),
  },
};
