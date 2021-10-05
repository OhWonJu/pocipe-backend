import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeHashTag(hashtag: String!): HashTag
  }
`