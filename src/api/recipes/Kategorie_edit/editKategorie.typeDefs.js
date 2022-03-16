import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editKategorie(id: String!, kategorie: String!): MutationResponse!
  }
`;
