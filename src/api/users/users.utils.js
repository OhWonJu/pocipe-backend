import jwt from "jsonwebtoken";

import client from "../../client";

export const getUser = async token => {
  try {
    if (!token) {
      return null;
    }
    // verify = decoded 된 token을 return
    const { id } = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// export const protectResolver = (user) => {
//   if (!user) {
//     // reoslver의 실행을 중단 = resvoler보호
//     // error를 throw하는 방법 대신에 결과를 리턴..
//     // 이 방식은 해당 함수를 호출한 부분에 return 하는것이기 때문에 resovler에서의 return이 아니지..
//     return {
//       ok: false,
//       error: "You need to login.",
//     };
//   }
// }

export const portectedResolver = gqlResolver => (root, args, context, info) => {
  if (!context.loggedInUser) {
    const query = info.operation.operation === "query";
    if (query) {
      return null;
    } else {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
  }
  return gqlResolver(root, args, context, info);
};