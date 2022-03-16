import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteIngredient(id: String!): MutationResponse!
  }
`;
