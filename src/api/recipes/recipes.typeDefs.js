import { gql } from "apollo-server-core";

export default gql`
  type Recipe {
    id: String!
    chef: User!
    #userId: String!
    chefId: String!
    disCount: Int!
    title: String!
    caption: String
    thumbNails: [String]
    servings: Int!
    difficulty: Int!
    cookingTime: Int!
    comments: [Comment!]
    commentsCount: Int!
    stars: [Star!]
    totalStar: Float!
    givnStar: Boolean!
    starsCount: Int!
    starAverage: Float!
    toDos: [ToDo!]
    toDosCount: Int!
    kategories: [Kategorie!]
    hashtags: [HashTag!]
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Kategorie {
    kategorieId: String!
    type: String!
    recipes(lastId: String): [Recipe!]
    recipesCount: Int!
  }
  type HashTag {
    id: String!
    hashtag: String!
    recipes(lastId: String): [Recipe!]
    recipesCount: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Star {
    id: Int!
    recipe: Recipe!
    star: Float!
    createdAt: String!
    updatedAt: String!
  }
  type Comment {
    id: Int!
  }

  type Mecipe {
    id: String!
    originalId: String!
    userId: String!
    chef: User!
    chefId: String!
    memo: String
    servings: Int!
    difficulty: Int!
    cookingTime: Int!
    meDos: [MeDo]
  }
`;
