import client from "../../client";

export default {
  Recipe: {
    hashtags: ({ id }) =>
      client.hashTag.findMany({
        where: {
          recipes: {
            some: {
              id,
            },
          },
        },
      }),
    isMine: ({ chefId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      } else {
        return chefId === loggedInUser.id;
      }
    },
    commentsCount: ({ id }) =>
      client.comment.count({ where: { recipeId: id } }),
    givnStar: ({ id }, _, { loggedInUser }) => {
      const myStar = client.star.findFirst({
        where: {
          recipeId: id,
          userId: loggedInUser.id,
        },
      });
      if (myStar) {
        return true;
      } else {
        return false;
      }
    },
    starAverage: ({ id, totalStar }) => {
      const stars = client.star.count({ where: { recipeId: id } });
      return totalStar / stars;
    },
    toDosCount: ({ id }) => client.toDo.count({ where: { recipeId: id } }),
  },
  Kategorie: {
    recipes: ({ id }, { lastId }) => {
      return client.kategorie
        .findUnique({
          where: {
            id,
          },
        })
        .recipes({
          take: 10,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
    },
  },
  HashTag: {
    recipes: ({ id }, { lastId }) => {
      return client.hashTag
        .findUnique({
          where: {
            id,
          },
        })
        .recipes({
          take: 10,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
    },
    recipesCount: ({ id }) => {
      client.recipe.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
  Star: {
    recipe: ({ recipeId }) =>
      client.recipe.findUnique({
        where: {
          id: recipeId,
        },
        select: {
          id: true,
          title: true,
          caption: true,
          thumbnails: true,
        },
      }),
  },
};
