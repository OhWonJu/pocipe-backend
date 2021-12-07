import client from "../../../client";

export default {
  Query: {
    seeRecomments: (_, { commentId, lastId }) =>
      client.recomment.findMany({
        where: {
          commentId,
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
