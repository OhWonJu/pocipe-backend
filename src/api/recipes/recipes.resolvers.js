import client from "../../client";

export default {
  Recipe: {
    chef: ({ chefId }) =>
      client.user.findUnique({
        where: {
          id: chefId,
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
    givnStar: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const myStar = await client.star.findFirst({
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
    starsCount: async ({ id }) =>
      await client.star.count({ where: { recipeId: id } }),
    starAverage: async ({ id, totalStar }) => {
      const stars = await client.star.count({ where: { recipeId: id } });
      if (totalStar <= 0) return 0;
      let avg = totalStar / stars;
      return avg.toFixed(1);
    },
    toDos: ({ id }) =>
      client.recipe
        .findUnique({ where: { id } })
        .toDos({ orderBy: { step: "asc" } }),
    toDosCount: ({ id }) => client.toDo.count({ where: { recipeId: id } }),
    kategories: ({ id }) =>
      client.kategorie.findMany({
        where: {
          recipes: {
            some: {
              id,
            },
          },
        },
      }),
    ingredients: ({ id }) =>
      client.ingredient.findMany({
        where: {
          recipes: {
            some: {
              id,
            },
          },
        },
      }),
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
    recipesCount: ({ id }) => {
      return client.recipe.count({
        where: {
          kategories: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
  Ingredient: {
    recipes: ({ id }, { lastId }) => {
      return client.ingredient
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
      return client.recipe.count({
        where: {
          ingredients: {
            some: {
              id,
            },
          },
        },
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
      return client.recipe.count({
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
          thumbNails: true,
        },
      }),
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
  },
  Mecipe: {
    chef: ({ chefId }) =>
      client.user.findUnique({
        where: {
          id: chefId,
        },
      }),
    meDos: ({ id }) =>
      client.mecipe
        .findUnique({ where: { id } })
        .meDos({ orderBy: { step: "asc" } }),
  },
};
