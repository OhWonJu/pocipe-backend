import client from "../../../client";
import { deleteInS3, uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (
  _,
  { id, file, title, caption, isTimer, time, step },
  { loggedInUser }
) => {
  const todo = await client.toDo.findUnique({
    where: {
      id,
    },
  });
  if (!todo) {
    return {
      ok: false,
      error: "ToDo does not exist.",
    };
  }
  let fileURL = null;
  if (file) {
    if (todo.file) {
      await deleteInS3(
        `https://pocipe-uploads.s3.ap-northeast-2.amazonaws.com/users/${loggedInUser.id}/recipes/${recipeId}/${toDoId}`
      );
    }
    fileURL = await uploadToS3(
      file,
      todo.id,
      `users/${loggedInUser.id}/recipes/${recipeId}/${toDoId}`
    );
  }
  const newTodo = await client.toDo.update({
    where: {
      id,
    },
    data: {
      title,
      caption,
      ...(fileURL && { file: fileURL }),
      isTimer,
      time,
      step,
    },
  });
  if (newTodo) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "ToDo update failed.",
    };
  }
};

export default {
  Mutation: {
    editToDo: protectedResolver(resolver),
  },
};
