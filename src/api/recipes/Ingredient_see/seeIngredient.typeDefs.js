import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeIngredient(ingredient: String!): Ingredient
  }
`;
