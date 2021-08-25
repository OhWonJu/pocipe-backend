import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    unsubscribingUser(userName: String!): MutationResponse
  }
`;
