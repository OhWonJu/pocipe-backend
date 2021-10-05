import client from "../../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { recipeId, file, title, caption, isTimer, time, step },
  { loggedInUser }
) => {
  const recipeExist = await client.recipe.findUnique({
    where: {
      id: recipeId,
    },
    select: {
      id: true,
      toDos: true,
    },
  });
  if (!recipeExist) {
    return {
      ok: false,
      error: "Recipe does not exist.",
    };
  }
  const toDoId = `${recipeId}-${title}`;
  let fileURL = null;
  if (file) {
    fileURL = await uploadToS3(
      file,
      loggedInUser.id,
      `users/${loggedInUser.id}/recipes/${recipeId}/${toDoId}`
    );
  }
  const titleExist = recipeExist.toDos.filter(todo => todo.title === title);
  if (titleExist.length !== 0) {
    return {
      ok: false,
      error: "Same title in recipe.",
    };
  }
  const stepExist = recipeExist.toDos.filter(todo => todo.step === step);
  if (stepExist.length !== 0) {
    return {
      ok: false,
      error: "Same step in recipe.",
    };
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
      error: "Failed create new todo.",
    };
  }
};

export default {
  Mutation: {
    createToDo: protectedResolver(resolver),
  },
};
