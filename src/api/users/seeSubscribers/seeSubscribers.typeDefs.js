import { gql } from "apollo-server-core";

export default gql`
  type SeeSubscribersResult {
    ok: Boolean!
    error: String
    subscribers: [User!]
  }
  type Query {
    seeSubscribers(userName: String!, lastId: String): SeeSubscribersResult!
  }
`;
