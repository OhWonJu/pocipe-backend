import client from "../../../client";

export default {
  Query: {
    searchRecipe: async (_, { keyword, lastId }) => {
      if (keyword === "") {
        return;
      }
      const recipes = await client.recipe.findMany({
        where: {
          title: {
            contains: keyword,
            // postgreSQL case insensitive option
            mode: "insensitive",
          },
        },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return recipes;
    },
  },
};
