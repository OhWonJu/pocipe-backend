import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    starsUpdates: Star
  }
`;