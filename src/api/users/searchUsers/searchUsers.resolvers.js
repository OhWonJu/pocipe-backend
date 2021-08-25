import client from "../../../client";
import { protectedResolver } from "../users.utils";

const resolver = async (_, { keyword, lastId }, { loggedInUser }) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "You need authorize.",
    };
  }
  if (keyword === "") {
    return;
  }
  const users = await client.user.findMany({
    where: {
      userName: {
        startsWith: keyword.toLowerCase(),
      },
    },
    take: 30,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  });
  return users;
};

export default {
  Query: {
    searchUsers: protectedResolver(resolver),
  },
};
