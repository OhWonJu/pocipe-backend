import { gql } from "apollo-server-core";

export default gql`
  type SeeSubscribingsResult {
    ok: Boolean!
    error: String
    subscribings: [User!]
  }
  type Query {
    seeSubscribings(userName: String!, lastId: String): SeeSubscribingsResult!
  }
`;
