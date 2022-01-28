import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import client from "../../../client";

export default {
  Mutation: {
    loginWithSNS: async (_, { email, snsKey }) => {
      // find user with args.userName
      const user = await client.user.findFirst({
        where: { email },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const snsKeydOk = await bcrypt.compare(snsKey, user.snsKey);
      if (!snsKeydOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
