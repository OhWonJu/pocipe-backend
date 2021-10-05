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
    select: {
      id: true,
      file: true,
      recipeId: true,
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
      await deleteInS3(todo.file);
    }
    fileURL = await uploadToS3(
      file,
      todo.id,
      `users/${loggedInUser.id}/recipes/${todo.recipeId}/${todo.id}`
    );
  }
  if (isTimer) {
    if (!time) {
      return {
        ok: false,
        error: "You need time argument.",
      };
    }
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
      error: "Failed todo update.",
    };
  }
};

export default {
  Mutation: {
    editToDo: protectedResolver(resolver),
  },
};
