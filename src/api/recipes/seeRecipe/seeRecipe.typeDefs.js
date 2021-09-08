import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeRecipe(id: String!): Recipe
  }
`;
