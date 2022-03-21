import { gql } from "apollo-server-core";

export default gql`
  # extend type Query {
  #   recipes(listId: [String!]): [Recipe!]
  #   recipe(id: ObjID!): Recipe
  # }
  type Query {
    seeRecipes(ids: [String!]): [Recipe!]
  }
`;
