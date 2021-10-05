import { gql } from "apollo-server-core";

export default gql`
  type ToDo {
    id: String!
    recipeId: String!
    file: String
    title: String!
    caption: String
    isTimer: Boolean!
    time: Int
    step: Int
  }

  type MeDo {
    id: String!
    mecipeId: String!
    originalId: String!
    memo: String
    isTimer: Boolean!
    time: Int
    step: Int
  }
`;
