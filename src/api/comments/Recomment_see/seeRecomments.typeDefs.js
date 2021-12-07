import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeRecomments(commentId: Int!, lastId: Int): [Recomment!]
  }
`;
