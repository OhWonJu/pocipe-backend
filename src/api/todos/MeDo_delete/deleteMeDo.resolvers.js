import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, __) => {
  const meDoEist = await client.meDo.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  if (!meDoEist) {
    return {
      ok: false,
      error: "Todo is not found.",
    };
  }
  await client.meDo.delete({
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
    deleteMeDo: protectedResolver(resolver),
  },
};
