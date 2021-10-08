import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteComment(id: Int!): MutationResponse!
  }
`;
