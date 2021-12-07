import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createRecomment(commentId: Int!, content: String!): MutationResponse!
  }
`;
