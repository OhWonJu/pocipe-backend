import client from "../../../client";

export default {
  Query: {
    seeIngredient: (_, { ingredient }) =>
      client.ingredient.findUnique({
        where: {
          ingredient,
        },
      }),
  },
};
