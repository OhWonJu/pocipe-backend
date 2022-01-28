import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      phoneNumber: String
      password: String
      snsKey: String
      bio: String
      profilePhoto: Upload
    ): MutationResponse!
  }
`;
