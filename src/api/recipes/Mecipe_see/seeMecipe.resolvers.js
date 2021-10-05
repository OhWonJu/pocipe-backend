import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const mecipe = await client.mecipe.findFirst({
    where: {
      id,
      userId: loggedInUser.id,
    },
  });
  if (!mecipe) {
    return {
      ok: false,
      error: "Not your diped recipe.",
    };
  }
  // 삭제되면 null로 나옴
  const recipe = await client.recipe.findUnique({
    where: {
      id: mecipe.originalId,
    },
  });
  if (!recipe) {
    await client.mecipe.update({
      where: { id },
      data: {
        originalId: "None",
      },
    });
  }
  return {
    ok: true,
    recipe,
    mecipe,
  };
};

export default {
  Query: {
    seeMecipe: protectedResolver(resolver),
  },
};
