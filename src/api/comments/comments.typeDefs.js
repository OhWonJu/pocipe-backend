import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: Int!
    user: User!
    recipe: Recipe!
    content: String!
    isMine: Boolean!
    recomments: [Recomment!]
    createdAt: String!
    updatedAt: String!
  }

  type Recomment {
    id: Int!
    user: User!
    comment: Comment!
    content: String!
    isMine: String!
    createdAt: String!
    updatedAt: String!
  }
`;
