import { gql } from "apollo-server-core";

export default gql`
  type SeeStarResult {
    star: Float
    user: User
  }

  type Query {
    seeStars(id: String!): [SeeStarResult!]
  }
`;
