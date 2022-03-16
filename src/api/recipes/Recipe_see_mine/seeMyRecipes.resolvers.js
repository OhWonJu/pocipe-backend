import client from "../../../client";

export default {
  Query: {
    seeMyRecipe: (_, __, { loggedInUser }) =>
      client.recipe.findMany({
        where: {
          chefId: loggedInUser.id,
        },
      }),
  },
};
