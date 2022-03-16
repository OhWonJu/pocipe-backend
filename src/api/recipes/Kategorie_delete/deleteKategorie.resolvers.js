import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }) => {
  const kategorie = await client.kategorie.findFirst({
    where: {
      id,
    },
  });
  if (!kategorie) {
    return {
      ok: false,
      error: "Kategorie not found.",
    };
  }
  await client.kategorie.delete({
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
    deleteKategorie: protectedResolver(resolver),
  },
};
