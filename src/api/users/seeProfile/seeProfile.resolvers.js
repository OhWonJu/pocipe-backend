import client from "../../../client";

export default {
  Query: {
    seeProfile: (_, { userName }) =>
      client.user.findUnique({
        where: {
          userName,
        },
        include: {
          subscribers: true,
          subscribings: true,
        },
      }),
  },
};
