import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { id, memo, servings, difficulty, cookingTime },
  { loggedInUser }
) => {
  const mecipeExist = await client.mecipe.findFirst({
    where: {
      id,
      userId: loggedInUser.id,
    },
    select: {
      id: true,
    },
  });
  if (!mecipeExist) {
    return {
      ok: false,
      error: "You are not this recipes owner.",
    };
  }
  const mecipe = await client.mecipe.update({
    where: {
      id,
    },
    data: {
      memo,
      servings,
      difficulty,
      cookingTime,
    },
  });
  if (mecipe) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update recipe.",
    };
  }
};

export default {
  Mutation: {
    editMecipe: protectedResolver(resolver),
  },
};
