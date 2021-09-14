import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id, star = 0 }, { loggedInUser }) => {
  const recipe = await client.recipe.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      totalStar: true,
    },
  });
  if (!recipe) {
    return {
      ok: false,
      error: "Recipe not found.",
    };
  }
  const starWhere = {
    recipeId_userId: {
      recipeId: id,
      userId: loggedInUser.id,
    },
  };
  const starExist = await client.star.findUnique({
    where: starWhere,
  });
  if (starExist) {
    await client.recipe.update({
      where: {
        id,
      },
      data: {
        totalStar: {
          decrement: starExist.star,
        },
      },
    });
    await client.star.delete({
      where: starWhere,
    });
    return {
      ok: true,
      rate: -1,
    };
  } else {
    await client.star.create({
      data: {
        user: {
          connect: {
            id: loggedInUser.id,
          },
        },
        recipe: {
          connect: {
            id: recipe.id,
          },
        },
        star: star,
      },
    });
    await client.recipe.update({
      where: {
        id,
      },
      data: {
        totalStar: {
          increment: star,
        },
      },
    });
    return {
      ok: true,
      rate: star,
    };
  }
};

export default {
  Mutation: {
    toggleStar: protectedResolver(resolver),
  },
};
