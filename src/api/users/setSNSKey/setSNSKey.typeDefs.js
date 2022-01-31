import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    setSNSKey(
      email: String!
      password: String!
      snsKey: String!
    ): MutationResponse
  }
`;
