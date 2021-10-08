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
        },
      });
      // const r = stars.map(star => {
      //   return {
      //     star: star.star,
      //     user: star.user,
      //   };
      // });
      return stars;
    },
  },
};
