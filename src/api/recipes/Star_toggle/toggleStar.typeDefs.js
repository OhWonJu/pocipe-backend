import { gql } from "apollo-server-core";

export default gql`
  type ToggleStarResult {
    ok: Boolean!
    rate: Float
    error: String
  }
  type Mutation {
    toggleStar(id: String!, star: Float): ToggleStarResult!
  }
`;
