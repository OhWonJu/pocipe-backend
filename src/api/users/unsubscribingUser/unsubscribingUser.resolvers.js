import client from "../../../client";
import { protectedResolver } from "../users.utils";

const resolver = async (_, { userName }, { loggedInUser }) => {
  const userExist = await client.user.findUnique({
    where: {
      userName,
    },
  });
  if (!userExist) {
    return {
      ok: false,
      error: "This User does not exist.",
    };
  } else {
    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        subscribings: {
          disconnect: { userName },
        },
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    unsubscribingUser: protectedResolver(resolver),
  },
};
