import client from "../../../client";

export default {
  Query: {
    seeRecipes: (_, { ids }) =>
      client.recipe.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      }),
  },
};
