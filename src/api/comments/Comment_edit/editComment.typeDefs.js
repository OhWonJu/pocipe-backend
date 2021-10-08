import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editComment(id: Int!, content: String!): MutationResponse!
  }
`;
