import client from "../../client";

export default {
  Comment: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          userName: true,
          profilePhoto: true,
        },
      }),
    recipe: ({ recipeId }) =>
      client.recipe.findUnique({
        where: {
          id: recipeId,
        },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      } else {
        return userId === loggedInUser.id;
      }
    },
  },
  Recomment: {
    user: ({ userId }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          userName: true,
          profilePhoto: true,
        },
      }),
    comment: ({ commentId }) =>
      client.comment.findUnique({
        where: {
          id: commentId,
        },
      }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      } else {
        return userId === loggedInUser.id;
      }
    },
  },
};
