import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
      bio: String
      profilePhoto: Upload
    ): MutationResponse!
  }
`;
