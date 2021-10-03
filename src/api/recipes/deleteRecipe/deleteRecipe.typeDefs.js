import { gql } from "apollo-server-core";

export default gql`
  type Mutation { 
    deleteRecipe(id: String!): MutationResponse!
  }
`