import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, __, { loggedInUser }) => {
  const newRecipe = await client.recipe.create({
    data: {
      chef: {
        connect: {
          id: loggedInUser.id,
        },
      },
      userId: loggedInUser.id,
    },
  });
  if (newRecipe) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Failed create new recipe.",
    };
  }
};

export default {
  Mutation: {
    createRecipe: protectedResolver(resolver),
  },
};
