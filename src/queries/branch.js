import gql from "graphql-tag";

export const GET_BRANCHES = gql`
  query BranchesQuery {
    branches {
      id
      branch
      address
      latitude
      longitude
      contact
      phone
      active
    }
  }
`;