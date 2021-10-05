import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createMeDo(
      mecipeId: String!
      originalId: String!
    ): MutationResponse!
  }
`;
