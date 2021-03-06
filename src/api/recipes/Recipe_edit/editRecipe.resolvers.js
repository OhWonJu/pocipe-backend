import client from "../../../client";
import { deleteDirInS3, uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../recipes.utils";

const resolver = async (
  _,
  {
    id,
    title,
    caption,
    thumbNails,
    servings,
    difficulty,
    cookingTime,
    kategorieIds,
    ingredientIds,
  },
  { loggedInUser }
) => {
  const recipeExist = await client.recipe.findFirst({
    where: {
      id,
      chefId: loggedInUser.id,
    },
    include: {
      hashtags: {
        select: {
          id: true,
          hashtag: true,
          recipes: true,
        },
      },
      kategories: {
        select: {
          id: true,
        },
      },
      ingredients: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!recipeExist) {
    return {
      ok: false,
      error: "You are not this recipes owner.",
    };
  }
  let thumbNailsURL = [];
  if (thumbNails) {
    if (recipeExist.thumbNails) {
      await deleteDirInS3(
        `https://pocipe-uploads.s3.ap-northeast-2.amazonaws.com/users/${loggedInUser.id}/recipes/${recipeExist.id}/thumbnails/`
      );
    }
    thumbNailsURL = await Promise.all(
      thumbNails.map(async thumNail => {
        const thumbNailURL = await uploadToS3(
          thumNail,
          recipeExist.id,
          `users/${loggedInUser.id}/recipes/${recipeExist.id}/thumbnails`
        );
        return thumbNailURL;
      })
    );
  }
  const oldKategories = recipeExist.kategories;
  const oldIngredients = recipeExist.ingredients;
  const hashIds = recipeExist.hashtags.map(hash => ({
    id: hash.id,
  }));
  const recipe = await client.recipe.update({
    where: {
      id,
    },
    data: {
      title,
      ...(caption && {
        caption: caption,
        hashtags: {
          disconnect: hashIds,
          connectOrCreate: processHashtags(caption),
        },
      }),
      ...(thumbNails && { thumbNails: thumbNailsURL }),
      servings,
      difficulty,
      cookingTime,
      ...(kategorieIds && {
        kategories: {
          disconnect: oldKategories,
          connect: kategorieIds,
        },
      }),
      ...(ingredientIds && {
        ingredients: {
          disconnect: oldIngredients,
          connect: ingredientIds,
        },
      }),
    },
  });
  if (recipe.id) {
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
      // filter callback????????? await??? ????????????, callback??? ?????? promise??? ???????????????. promise??? ?????? 'truthy'
      // promise??? ????????? ??????..
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
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update recipe.",
    };
  }
};

export default {
  Mutation: {
    editRecipe: protectedResolver(resolver),
  },
};
