import client from "../../../client";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { kategorie }) => {
  const kategorieExist = await client.kategorie.findFirst({
    where: {
      kategorie,
    },
  });
  if (kategorieExist) {
    return {
      ok: false,
      error: `${kategorie} already exist.`,
    };
  }
  const newKategorie = await client.kategorie.create({
    data: {
      kategorie,
    },
  });
  if (newKategorie) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "create Kategorie failed.",
    };
  }
};

export default {
  Mutation: {
    createKategorie: protectedResolver(resolver),
  },
};
