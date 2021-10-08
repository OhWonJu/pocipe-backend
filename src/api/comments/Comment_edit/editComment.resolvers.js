import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id, content }, { loggedInUser }) => {
  const comment = await client.comment.findUnique({
    where: {
      id,
    },
    select: {
      userId: true,
    },
  });
  if (!comment) {
    return {
      ok: false,
      error: "Comment not found.",
    };
  } else if (comment.userId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    await client.comment.update({
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
    editComment: protectedResolver(resolver),
  },
};
