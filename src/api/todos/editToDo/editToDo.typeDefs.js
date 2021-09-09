import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editToDo(
      id: String!
      file: String
      title: String
      caption: String
      isTimer: Boolean!
      time: String
      step: String
    ): MutationResponse!
  }
`;
