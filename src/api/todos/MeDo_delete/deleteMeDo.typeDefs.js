import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteMeDo(id: String!): MutationResponse!
  }
`;
