import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editIngredient(id: String!, ingredient: String!): MutationResponse!
  }
`;
