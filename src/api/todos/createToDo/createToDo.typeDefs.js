import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createToDo(
      recipeId: String!
      file: String
      title: String!
      caption: String!
      isTimer: Boolean!
      time: Int
      step: Int
    ): MutationResponse!
  }
`;
