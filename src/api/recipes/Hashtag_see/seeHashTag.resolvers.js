import client from "../../../client";

export default {
  Query: {
    seeHashTag: (_, { hashtag }) =>
      client.hashTag.findUnique({
        where: {
          hashtag,
        },
      }),
  },
};
