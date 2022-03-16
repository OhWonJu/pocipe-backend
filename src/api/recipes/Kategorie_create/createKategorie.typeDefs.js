import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createKategorie(kategorie: String!): MutationResponse!
  }
`;
