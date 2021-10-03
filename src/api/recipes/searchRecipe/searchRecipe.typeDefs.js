import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchRecipe(keyword: String!, lastId: String): [Recipe!]
  }
`;
