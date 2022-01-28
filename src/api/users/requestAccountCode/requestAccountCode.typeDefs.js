import { gql } from "apollo-server-core";

export default gql`
  type AccountCode {
    ok: Boolean!
    error: String
    code: String
  }

  type Query {
    requestAccountCode(email: String!): AccountCode
  }
`