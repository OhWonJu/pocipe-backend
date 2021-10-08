import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeRecipeComments(recipeId: String!, lastId: Int): [Comment!]
  }
`;
