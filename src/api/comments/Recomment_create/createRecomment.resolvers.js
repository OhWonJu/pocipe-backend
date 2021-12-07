import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { commentId, content }, { loggedInUser }) => {
  const comment = await client.comment.findUnique({
    where: {
      id: commentId,
    },
    select: {
      id: true,
    },
  });
  if (!comment) {
    return {
      ok: false,
      error: "Comment not found.",
    };
  }
  await client.recomment.create({
    data: {
      content,
      comment: {
        connect: {
          id: commentId,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    createRecomment: protectedResolver(resolver),
  },
};
