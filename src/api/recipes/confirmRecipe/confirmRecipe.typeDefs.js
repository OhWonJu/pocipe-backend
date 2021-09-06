import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    confirmRecipe(
      id: String!
      title: String
      caption: String
      thumbNails: [Upload]
      servings: Int!
      difficulty: Int!
      cookingTime: Int!
      kategorieIds: [String]
    ): MutationResponse!
  }
`;
