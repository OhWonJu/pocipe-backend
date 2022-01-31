import { gql } from "apollo-server-express";

export default gql`
  type SNSInfo {
    ok: Boolean!
    snsKey: String
  }

  type Query {
    getSNSInfo(email: String!, snsKey: String!): SNSInfo!
  }
`;
