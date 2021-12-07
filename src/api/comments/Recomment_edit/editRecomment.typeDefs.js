import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editRecomment(id: Int!, content: String!): MutationResponse!
  }
`;
