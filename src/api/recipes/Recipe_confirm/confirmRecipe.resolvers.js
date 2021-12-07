import client from "../../../client";
import { NEW_RECIPE } from "../../../constents";
import pubsub from "../../../pubsub";
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
  },
  { loggedInUser }
) => {
  const recipeExist = await client.recipe.findUnique({
    where: {
      id,
    },
    include: {
      hashtags: {
        select: {
          id: true,
          hashtag: true,
          recipes: true,
        },
      },
      kategories: true,
    },
  });
  if (!recipeExist) {
    return {
      ok: false,
      error: "Recipe does not exist.",
    };
  }
  let thumbNailsURL = [];
  // forEach는 callback들을 호출 할 뿐 callback들의 비동기 처리는 신경안씀
  // callback만 호출하면 다 끝난 걸로 간주..
  // map + promise.all() 조합으로 해결
  if (thumbNails) {
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
  let newKategories;
  if (kategorieIds) {
    newKategories = kategorieIds.map(kategorie => ({
      kategorieId: kategorie,
    }));
  }
  let hashtagObjs = [];
  if (caption) {
    hashtagObjs = processHashtags(caption);
  }
  const newRecipe = await client.recipe.update({
    where: {
      id,
    },
    data: {
      title,
      caption,
      thumbNails: thumbNailsURL,
      servings,
      difficulty,
      cookingTime,
      ...(kategorieIds && {
        kategories: {
          connect: newKategories,
        },
      }),
      ...(hashtagObjs.length > 0 && {
        hashtags: {
          connectOrCreate: hashtagObjs,
        },
      }),
    },
  });
  if (newRecipe.id) {
    pubsub.publish(NEW_RECIPE, { recipeUpdates: { ...newRecipe } });
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
    confirmRecipe: protectedResolver(resolver),
  },
};
