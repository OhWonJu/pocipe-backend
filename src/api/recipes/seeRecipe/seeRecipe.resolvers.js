import client from "../../../client";

export default {
  Query: {
    seeRecipe: (_, { id }) =>
      client.recipe.findUnique({
        where: {
          id,
        },
      }),
  },
};
