import { createWriteStream } from "fs"; // nodejs 라이브러리 파일 pip관련
import bcrypt from "bcrypt";

import client from "../../../client";
import { portectedResolver } from "../users.utils";
import { deleteInS3, uploadToS3 } from "../../shared/shared.utils";

const resolver = async (
  _,
  {
    firstName,
    lastName,
    userName,
    email,
    password: newPassword,
    bio,
    profilePhoto,
  },
  { loggedInUser }
) => {
  let profilePhotoUrl = null;
  if (profilePhoto) {
    const user = await client.user.findUnique({
      where: {
        id: loggedInUser.id,
      },
      select: {
        profilePhoto: true,
      },
    });
    if (user.profilePhoto) {
      await deleteInS3(user.profilePhoto);
    }
    profilePhotoUrl = await uploadToS3(
      profilePhoto,
      loggedInUser.id,
      `users/${loggedInUser.id}/profile`
    );
  }
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  if (userName) {
    const existingUserName = await client.user.findFirst({
      where: {
        userName,
      },
      select: {
        userName: true,
      },
    });
    if (existingUserName) {
      return {
        ok: false,
        error: "This userName is already taken.",
      };
    }
  }
  if (email) {
    const existingEmail = await client.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
      },
    });
    if (existingEmail) {
      return {
        ok: false,
        error: "this email is already taken.",
      };
    }
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      ...(userName && { userName: userName.toLowerCase() }),
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }), // ES6 문법.  ...(조건 && return Obj)
      ...(profilePhotoUrl && { profilePhoto: profilePhotoUrl }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: portectedResolver(resolver),
  },
};
