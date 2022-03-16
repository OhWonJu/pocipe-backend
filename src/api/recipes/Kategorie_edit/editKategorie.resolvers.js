import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id, kategorie }) => {
  const kategorieExist = await client.kategorie.findUnique({ where: { id } });
  if (!kategorieExist) {
    return {
      ok: false,
      error: "Kategorie not found.",
    };
  }
  await client.kategorie.update({
    where: {
      id,
    },
    data: {
      kategorie,
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    editKategorie: protectedResolver(resolver),
  },
};
