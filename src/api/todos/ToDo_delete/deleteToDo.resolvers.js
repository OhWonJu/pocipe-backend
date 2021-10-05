import client from "../../../client";
import { deleteInS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const todo = await client.toDo.findUnique({
    where: {
      id,
    },
    select: {
      recipe: {
        select: {
          id: true,
          chefId: true,
        },
      },
      file: true,
    },
  });
  if (!todo) {
    return {
      ok: false,
      error: "ToDo not found.",
    };
  } else if (todo.recipe.chefId !== loggedInUser.id) {
    return {
      ok: false,
      error: "Not authorized.",
    };
  } else {
    if (todo.file) {
      await deleteInS3(todo.file);
    }
    await client.toDo.delete({
      where: {
        id,
      },
    });
    return {
      ok: true,
    };
  }
};

export default {
  Mutation: {
    deleteToDo: protectedResolver(resolver),
  },
};
