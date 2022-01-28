import bcrypt from "bcrypt";

import client from "../../../client";

const resolver = async (_, { email, snsKey }) => {
  const userExist = await client.user.findUnique({
    where: { email },
    select: {
      snsKey: true,
    },
  });
  // 유저가 존재하지 않으면 -> SNS 계정 만들기로
  console.log(userExist);
  if (!userExist) {
    return {
      ok: false,
    };
  }
  if (!userExist.snsKey) {
    return {
      ok: true,
      snsKey: "none",
    };
  }
  // 크립토화된 키랑 주어진 키가 같으면
  // sns 로긴을 호출하자.
  if (await bcrypt.compare(userExist.snsKey, snsKey)) {
    return {
      ok: true,
      snsKey: "same",
    };
  } else {
    return {
      ok: true,
      snsKey: "different",
    };
  }
};

export default {
  Query: {
    getSNSInfo: resolver,
  },
};
