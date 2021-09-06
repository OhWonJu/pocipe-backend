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
  },
  { loggedInUser }
) => {
  const recipeExist = await client.recipe.findUnique({
    where: {
      id,
      userId: loggedInUser.id,
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
      error: "You are not this recipes owner.",
    };
  }
  let thumbNailsURL = [];
  if (thumbNails) {
    if (recipeExist.thumbNails) {
      await deleteDirInS3(
        `https://pocipe-uploads.s3.ap-northeast-2.amazonaws.com/users/${loggedInUser.id}/recipes/${recipeExist.id}/thumbnails`
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
  console.log(thumbNailsURL);
  const oldKategories = recipeExist.kategories;
  const hashIds = recipeExist.hashtags.map(hash => ({
    id: hash.id,
  }));
  const recipe = await client.recipe.update({
    where: {
      id,
    },
    data: {
      ...title,
      ...(caption && {
        caption: caption,
        hashtags: {
          disconnect: hashIds,
          connectOrCreate: processHashtags(caption),
        },
      }),
      ...(thumbNails && { thumbNails: thumbNailsURL }),
      ...servings,
      ...difficulty,
      ...cookingTime,
      ...(kategorieIds && {
        kategories: {
          disconnect: oldKategories,
          connect: kategorieIds,
        },
      }),
    },
  });
  if (recipe.id) {
    if (hashIds.length !== 0) {
      const hashs = await Promise.all(
        hashIds.map(
          async hashId =>
            await client.hashtag.findFirst({
              where: { id: hashId.id },
              select: {
                groups: { select: { id: true } },
              },
            })
        )
      );
      // filter callback안에서 await을 사용하면, callback은 항상 promise를 반환합니다. promise는 항상 'truthy'
      // promise를 밖에서 해결..
      const noGroups = hashIds.filter((hashId, index) => {
        const hash = hashs[index];
        if (hash.groups.length === 0) {
          return hashId.id;
        } else {
          return null;
        }
      });
      await client.hashtag.deleteMany({ where: { OR: noGroups } });
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
