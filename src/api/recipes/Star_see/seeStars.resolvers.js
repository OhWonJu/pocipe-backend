import client from "../../../client";

export default {
  Query: {
    seeStars: async (_, { id }) => {
      const stars = await client.star.findMany({
        where: {
          recipeId: id,
        },
        select: {
          star: true,
          user: {
            select: {
              userName: true,
              profilePhoto: true,
            },
          },
          createdAt: true,
        },
        take: 30,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: {
          createdAt: "desc",
        },
      });
      return stars;
    },
  },
};
