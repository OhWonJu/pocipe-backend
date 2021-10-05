import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const mecipeExist = await client.mecipe.findFirst({
    where: {
      userId: loggedInUser.id,
      originalId: id,
    },
  });
  if(mecipeExist) {
    return {
      ok: false,
      error: "You already diped."
    }
  }
  const original = await client.recipe.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      chefId: true,
      servings: true,
      difficulty: true,
      cookingTime: true,
    },
  });
  if (!original) {
    return {
      ok: false,
      error: "Original Recipe not found.",
    };
  }
  const mecipe = await client.mecipe.create({
    data: {
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
      originalId: original.id,
      chefId: original.chefId,
    },
  });
  if (mecipe) {
    await client.user.update({
      where: {
        id: loggedInUser.id,
      },
      data: {
        dips: {
          push: original.id,
        },
      },
    });
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Failed create Mycipe.",
    };
  }
};

export default {
  Mutation: {
    createMecipe: protectedResolver(resolver),
  },
};
