import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createIngredient(ingredient: String!): MutationResponse!
  }
`; 