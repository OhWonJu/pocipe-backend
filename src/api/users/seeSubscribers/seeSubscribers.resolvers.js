import client from "../../../client";

const resovler = async (_, { userName, lastId }) => {
  const userExist = await client.user.findUnique({
    where: { userName },
    select: { id: true },
  });
  if (!userExist) {
    return {
      ok: false,
      error: "This User does not exist.",
    };
  } else {
    const subscribers = await client.user
      .findUnique({ where: { userName } })
      .subscribers({
        take: 30,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
    return {
      ok: true,
      subscribers,
    };
  }
};

export default {
  Query: {
    seeSubscribers: resovler,
  },
};
