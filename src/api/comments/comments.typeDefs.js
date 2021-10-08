import { gql } from "apollo-server-core";

export default gql`
  type Comment {
    id: Int!
    user: User!
    recipe: Recipe!
    content: String!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
