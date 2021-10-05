import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const mecipe = await client.mecipe.findFirst({
    where: { id, userId: loggedInUser.id },
    include: {
      meDos: true,
    },
  });
  if (!mecipe) {
    return {
      ok: false,
      error: "Recipe not found.",
    };
  }
  await client.meDo.deleteMany({
    where: {
      mecipeId: id,
    },
  });
  await client.mecipe.delete({
    where: {
      id,
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    deleteMecipe: protectedResolver(resolver),
  },
};
