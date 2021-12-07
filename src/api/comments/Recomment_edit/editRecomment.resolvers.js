import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id, content }, { loggedInUser }) => {
  const recomment = await client.recomment.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });
  if (!recomment) {
    return {
      ok: false,
      error: "Recomment not found.",
    };
  } else if (recomment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    await client.recomment.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    editRecomment: protectedResolver(resolver),
  },
};
