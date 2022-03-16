import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteKategorie(id: String!): MutationResponse!
  }
`;
