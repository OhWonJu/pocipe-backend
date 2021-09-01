import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createToDo(
      toDoId: String!
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
