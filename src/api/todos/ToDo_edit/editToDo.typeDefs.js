import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editToDo(
      id: String!
      file: Upload
      title: String
      caption: String
      isTimer: Boolean
      time: Int
      step: Int
    ): MutationResponse!
  }
`;
