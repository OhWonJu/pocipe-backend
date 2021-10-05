import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editMeDo(
      id: String!
      memo: String
      isTimer: Boolean
      time: Int
      step: Int
    ): MutationResponse!
  }
`;
