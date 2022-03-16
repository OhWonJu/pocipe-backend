import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id, ingredient }) => {
  const ingredientExist = await client.ingredient.findUnique({ where: { id } });
  if (!ingredientExist) {
    return {
      ok: false,
      error: "Ingredient not found.",
    };
  }
  await client.ingredient.update({
    where: {
      id,
    },
    data: {
      ingredient,
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editIngredient: protectedResolver(resolver),
  },
};
