import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { ingredient }) => {
  const ingredientExist = await client.ingredient.findFirst({
    where: {
      ingredient,
    },
  });
  if (ingredientExist) {
    return {
      ok: false,
      error: `${ingredient} already exist.`,
    };
  }
  const newIngredient = await client.ingredient.create({
    data: {
      ingredient,
    },
  });
  if (newIngredient) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "create Ingredient failed.",
    };
  }
};

export default {
  Mutation: {
    createIngredient: protectedResolver(resolver),
  },
};
