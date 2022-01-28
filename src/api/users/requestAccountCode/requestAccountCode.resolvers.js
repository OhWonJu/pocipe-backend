import client from "../../../client";
import { generateAccountCode, sendAccountMail } from "../../../utils";

export default {
  Query: {
    requestAccountCode: async (_, { email }) => {
      const existEmail = await client.user.findUnique({
        where: {
          email,
        },
        select: {
          email: true,
        },
      });
      if (existEmail) {
        return {
          ok: false,
          error: "Email exist.",
        };
      } else {
        const accountCode = generateAccountCode();
        try {
          await sendAccountMail(email, accountCode);
          return {
            ok: true,
            code: accountCode,
          };
        } catch {
          return {
            ok: false,
            error: "AccountCode request is failed.",
          };
        }
      }
    },
  },
};
