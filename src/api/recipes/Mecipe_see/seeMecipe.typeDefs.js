import { gql } from "apollo-server-core";

export default gql`
  type SeeMecipeResult {
    ok: Boolean!
    error: String
    recipe: Recipe
    mecipe: Mecipe
  }
  type Query {
    seeMecipe(id: String!): SeeMecipeResult!
  }
`;
