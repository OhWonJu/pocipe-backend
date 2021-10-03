import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    dipRecipe(id: String!): MutationResponse!
  }
`;
