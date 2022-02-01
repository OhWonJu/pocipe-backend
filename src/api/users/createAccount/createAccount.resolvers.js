import bcrypt from "bcrypt";

import client from "../../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, phoneNumber, password, snsKey }
    ) => {
      try {
        const existingUserName = await client.user.findFirst({
          where: {
            userName,
          },
        });
        const existingEmail = await client.user.findFirst({
          where: {
            email,
          },
        });
        // 방어적 프로그래밍 - 중복 관련 에러 처리
        if (existingUserName) {
          return {
            ok: false,
            error: "This userName is already taken.",
          };
        }
        if (existingEmail) {
          return {
            ok: false,
            error: "this email is already taken.",
          };
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        const ugleSNSKey = await bcrypt.hash(snsKey, 10);

        const newUser = await client.user.create({
          data: {
            userName: userName.toLowerCase(),
            email,
            phoneNumber,
            firstName,
            lastName,
            // profilePhoto: "https://plat-uploads.s3.ap-northeast-2.amazonaws.com/default/user/default_user_profile.png"
            password: uglyPassword,
            snsKey: ugleSNSKey,
          },
        });
        if (newUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not create user.",
          };
        }
      } catch (error) {
        return error;
      }
    },
  },
};
