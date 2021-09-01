import { gql } from "apollo-server-core";

export default gql`
  type Recipe {
    id: String!
    userId: String!
    chefId: String!
    disCount: Int!
    title: String!
    caption: String
    thumbNail: [String]
    servings: Int!
    difficulty: Int!
    cookingTime: Int!
    type: String
    comments: [Comment!]
    commentsCount: Int!
    stars: [Star!]
    totalStar: Float!
    givnStar: Boolean!
    starAverage: Float!
    toDos: [ToDo!]
    toDosCount: Int!
    hashtags: [Hashtag!]
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Hashtag {
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
  type Comment{
    id: Int!
  }
`;
