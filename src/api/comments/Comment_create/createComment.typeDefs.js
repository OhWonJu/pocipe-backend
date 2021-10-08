import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createComment(recipeId: String!, content: String!): MutationResponse!
  }
`;
