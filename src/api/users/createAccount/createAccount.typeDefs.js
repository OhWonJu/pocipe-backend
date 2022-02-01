import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createAccount(
      firstName: String
      lastName: String
      userName: String!
      email: String!
      phoneNumber: String
      password: String!
      snsKey: String
    ): MutationResponse!
  }
`;
