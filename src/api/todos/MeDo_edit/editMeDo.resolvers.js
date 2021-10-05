import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id, memo, isTimer, time, step }, __) => {
  if (isTimer) {
    if (!time) {
      return {
        ok: false,
        error: "You need time argument.",
      };
    }
  }
  const newMedo = await client.meDo.update({
    where: {
      id,
    },
    data: {
      memo,
      isTimer,
      time,
      step,
    },
  });
  if (newMedo) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Failed todo update.",
    };
  }
};

export default {
  Mutation: {
    editMeDo: protectedResolver(resolver),
  },
};
