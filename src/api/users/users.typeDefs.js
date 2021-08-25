import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    # password: String
    bio: String
    profilePhoto: String
    #recipes: [Recipe!]
    #dips: [String!]
    # stars: [Star!]
    subscribers: [User!]
    subscribings: [User!]
    #point: Int!
    createdAt: String!
    updatedAt: String!
    # computed Fiels
    subscribersCount: Int!
    subscribingsCount: Int!
    isMe: Boolean!
    isSubscribe: Boolean!
  }
`;
