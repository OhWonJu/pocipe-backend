import client from "../../../client";

const resolver = async (_, { userName, lastId }) => {
  const userExist = await client.user.findUnique({
    where: {
      userName,
    },
    select: {
      id: true,
    },
  });
  if (!userExist) {
    return {
      ok: false,
      error: "This user does not exist.",
    };
  } else {
    const subscribings = await client.user
      .findUnique({ where: { userName } })
      .subscribings({
        take: 30,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
    return {
      ok: true,
      subscribings,
    };
  }
};

export default {
  Query: {
    seeSubscribings: resolver,
  },
};
