import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }) => {
  const ingredient = await client.ingredient.findFirst({
    where: {
      id,
    },
  });
  if (!ingredient) {
    return {
      ok: false,
      error: "Ingredient not found.",
    };
  }
  await client.ingredient.delete({
    where: {
      id,
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    deleteIngredient: protectedResolver(resolver),
  },
};
