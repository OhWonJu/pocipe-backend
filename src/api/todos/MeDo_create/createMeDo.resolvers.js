import { Organizations } from "aws-sdk";
import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { mecipeId, originalId }, { loggedInUser }) => {
  const mecipeExist = await client.mecipe.findUnique({
    where: {
      id: mecipeId,
    },
    select: {
      id: true,
      meDos: true,
    },
  });
  if (!mecipeExist) {
    return {
      ok: false,
      error: "recipe does not exist.",
    };
  }
  const toDo = await client.toDo.findUnique({
    where: {
      id: originalId,
    },
  });
  const meDoId = `${mecipeId}-${toDo.title}`;
  const meDoExist = mecipeExist.meDos.filter(medo => medo.id === meDoId);
  if (meDoExist.length !== 0) {
    return {
      ok: false,
      error: "My todo already exist.",
    };
  }
  const newMeDo = await client.meDo.create({
    data: {
      id: meDoId,
      mecipe: {
        connect: {
          id: mecipeId,
        },
      },
      originalId,
      isTimer: toDo.isTimer,
      time: toDo.time,
      step: toDo.step,
    },
  });
  if (newMeDo) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Failed create new medo.",
    };
  }
};

export default {
  Mutation: {
    createMeDo: protectedResolver(resolver),
  },
};
