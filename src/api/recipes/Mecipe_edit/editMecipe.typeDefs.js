import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editMecipe(
      id: String!
      memo: String
      servings: Int
      difficulty: Int
      cookingTime: Int
    ): MutationResponse!
  }
`;
