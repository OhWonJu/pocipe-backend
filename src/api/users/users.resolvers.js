import client from "../../client";

export default {
  User: {
    starAverage: async ({ id, starCount, totalStar }) => {
      if (totalStar <= 0) return 0;
      let avg = totalStar / starCount;
      return avg.toFixed(1);
    },
    subscribersCount: ({ id }) =>
      client.user.count({
        where: {
          subscribings: {
            some: {
              id,
            },
          },
        },
      }),
    subscribingsCount: ({ id }) =>
      client.user.count({
        where: {
          subscribers: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isSubscribe: async ({ id }, _, { loggedInUser }) => {
      // id = request된 id === 현재 보고 있는 프로필 유저의 id
      if (!loggedInUser) {
        return false;
      }
      // login 된 user의 following 리스트에서 root로 받은 id가 있는지 확인
      const exists = await client.user.count({
        where: {
          userName: loggedInUser.userName,
          subscribings: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    recipes: ({ id }) =>
      client.user
        .findUnique({ where: { id } })
        .recipes({ orderBy: { createdAt: "desc" } }),
    mecipes: ({ id }) =>
      client.user
        .findUnique({ where: id })
        .mecipes({ orderBy: { updatedAt: "desc" } }),
  },
};
