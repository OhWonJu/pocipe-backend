import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      userName: String!
      email: String!
      password: String!
    ): MutationResponse!
  }
`;
