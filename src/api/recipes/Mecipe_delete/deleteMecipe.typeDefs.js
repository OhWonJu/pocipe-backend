import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteMecipe(id: String!): MutationResponse!
  }
`;
