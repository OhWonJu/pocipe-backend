export const processHashtags = bio => {
  // parse bio
  const hashtags = bio.match(/#[\w]+/g) || [];
  // map return array~
  return hashtags.map(hashtag => ({
    where: { hashtag },
    create: { hashtag },
  }));
};