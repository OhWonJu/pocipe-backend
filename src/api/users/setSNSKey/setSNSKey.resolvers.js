import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import client from "../../../client";

const resolver = async (_, { email, password, snsKey }) => {
  const user = await client.user.findUnique({
    where: { email },
  });
  if (!user) {
    return {
      ok: false,
      error: "User not found.",
    };
  }
  const passwordOk = await bcrypt.compare(password, user.password);
  if (!passwordOk) {
    return {
      ok: false,
      error: "Incorrect password",
    };
  }
  const uglySNSKey = await bcrypt.hash(snsKey, 10);
  const updateSNSKey = await client.user.update({
    where: {
      email,
    },
    data: {
      ...(uglySNSKey && { snsKey: uglySNSKey }),
    },
  });
  console.log(updateSNSKey)
  if (updateSNSKey.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update SNSKey.",
    };
  }
};

export default {
  Mutation: {
    setSNSKey: resolver,
  },
};
