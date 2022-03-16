import { gql } from "apollo-server-core";

export default gql`
  type Recipe {
    id: String!
    chef: User!
    chefId: String!
    dipsCount: Int!
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
    ingredients: [Ingredient!]
    hashtags: [HashTag!]
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Kategorie {
    id: String!
    kategorie: String!
    recipes(lastId: String): [Recipe!]
    recipesCount: Int!
  }
  type Ingredient {
    id: String!
    ingredient: String!
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
    user: User!
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
    user: User!
    userId: String!
    chef: User!
    chefId: String!
    memo: String
    servings: Int!
    difficulty: Int!
    cookingTime: Int!
    meDos: [MeDo!]
  }
`;
