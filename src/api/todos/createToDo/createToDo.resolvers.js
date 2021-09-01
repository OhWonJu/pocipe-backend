import client from "../../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { toDoId, recipeId, file, title, caption, isTimer, time, step },
  { loggedInUser }
) => {
  if (!loggedInUser) {
    return {
      ok: false,
      error: "You need authetication.",
    };
  }
  const recipeExist= await client.recipe.findUnique({
    where: {
      id: recipeId,
    },
    select: {
      id: true,
    },
  });
  if (!recipeExist) {
    return {
      ok: false,
      error: "Recipe does not exist.",
    };
  }
  let fileURL = null;
  if (file) {
    fileURL = await uploadToS3(
      file,
      loggedInUser.id,
      `users/${loggedInUser.id}/recipes/todos/${recipeId}`
    );
  }
  const newToDo = await client.toDo.create({
    data: {
      id: toDoId,
      recipe: {
        connect: {
          id: recipeId,
        },
      },
      ...(fileURL && { file: fileURL }),
      title,
      caption,
      isTimer,
      time,
      step,
    },
  });
  if (newToDo) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Failed create new todso.",
    };
  }
};

export default {
  Mutation: {
    createToDo: protectedResolver(resolver),
  },
};
