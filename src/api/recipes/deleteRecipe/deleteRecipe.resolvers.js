import client from "../../../client";
import { deleteDirInS3, deleteInS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

const resolver = async (_, { id }, { loggedInUser }) => {
  const recipe = await client.recipe.findFirst({
    where: {
      id,
      chefId: loggedInUser.id,
    },
    include: {
      hashtags: true,
      comments: true,
      stars: true,
      toDos: true,
    },
  });
  if (!recipe) {
    return {
      ok: false,
      error: "Recipe not found.",
    };
  }
  if (recipe.thumbNails) {
    await deleteDirInS3(
      `https://pocipe-uploads.s3.ap-northeast-2.amazonaws.com/users/${loggedInUser.id}/recipes/${recipe.id}/thumbnails/`
    );
  }
  const hashIds = recipe.hashtags.map(hash => ({
    id: hash.id,
  }));
  await client.recipe.update({
    where: {
      id,
    },
    data: {
      hashtags: {
        disconnect: hashIds,
      },
    },
  });
  if (hashIds.length !== 0) {
    const hashs = await Promise.all(
      hashIds.map(
        async hashId =>
          await client.hashTag.findFirst({
            where: { id: hashId.id },
            select: {
              recipes: { select: { id: true } },
            },
          })
      )
    );
    const noRecipes = hashIds.filter((hashId, index) => {
      const hash = hashs[index];
      if (hash.recipes.length === 0) {
        return hashId.id;
      } else {
        return null;
      }
    });
    await client.hashTag.deleteMany({ where: { OR: noRecipes } });
  }
  recipe.toDos.map(async toDo => {
    if (toDo.file) {
      await deleteInS3(toDo.file);
    }
  });
  await client.toDo.deleteMany({
    where: {
      recipeId: id,
    },
  });
  await client.comment.deleteMany({
    where: {
      recipeId: id,
    },
  });
  await client.star.deleteMany({
    where: {
      recipeId: id,
    },
  });
  await client.recipe.delete({
    where: {
      id,
    },
  });
  return {
    ok: true,
  };
};

export default {
  Mutation: {
    deleteRecipe: protectedResolver(resolver),
  },
};
