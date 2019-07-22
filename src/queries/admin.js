import gql from "graphql-tag";

export const GET_ADMINS = gql`
  query AdminsQuery {
    admins {
      id
      username
      email
      password
    }
  }
`;
