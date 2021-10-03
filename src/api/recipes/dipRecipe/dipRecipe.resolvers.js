import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const original = await client.recipe.findUnique({
    where: {
      id,
    },
  });
  if (!original) {
    return {
      ok: false,
      error: "Original Recipe not found.",
    };
  }
  await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      dips: {
        push: original.id,
      },
    },
  });
};

export default {
  Mutation: {
    dipRecipe: protectedResolver(resolver),
  },
};
