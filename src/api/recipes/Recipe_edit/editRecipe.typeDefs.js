import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editRecipe(
      id: String!
      title: String
      caption: String
      thumbNails: [Upload]
      servings: Int
      difficulty: Int
      cookingTime: Int
      kategorieIds: [String]
      ingredientIds: [String]
    ): MutationResponse!
  }
`;
