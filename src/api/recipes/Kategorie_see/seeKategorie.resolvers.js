import client from "../../../client";

export default {
  Query: {
    seeKategorie: (_, { kategorie }) =>
      client.kategorie.findUnique({
        where: {
          kategorie,
        },
      }),
  },
};
