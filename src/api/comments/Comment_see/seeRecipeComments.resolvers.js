import client from "../../../client";

export default {
  Query: {
    seeRecipeComments: (_, { recipeId, lastId }) =>
      client.comment.findMany({
        where: {
          recipeId,
        },
        take: 20,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
