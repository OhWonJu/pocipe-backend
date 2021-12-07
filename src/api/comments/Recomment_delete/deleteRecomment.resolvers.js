import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
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
    await client.recomment.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }
};
export default {
  Mutation: {
    deleteRecomment: protectedResolver(resolver),
  },
};
