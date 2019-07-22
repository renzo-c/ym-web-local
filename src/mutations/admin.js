import gql from "graphql-tag";

export const NEW_ADMIN = gql`
mutation addAdmin(
  $username: String!
  $email: String!
  $password: String!
) {
  addAdmin(
    username: $username
    email: $email
    password: $password
  ) {
    id
    username
    email
    password
  }
}
`;

export const UPDATE_ADMIN = gql`
  mutation updateAdmin(
    $id: ID!
    $username: String
    $password: String
    $email: String
  ) {
    updateAdmin(
      id: $id
      username: $username
      password: $password
      email: $email
    ) {
      id
      username
      password
      email
    }
  }
`;

export const UPDATE_SUPERADMIN = gql`
  mutation updateSuperadmin(
    $password: String
  ) {
    updateSuperadmin(
      password: $password
    ) {
      username
      password
    }
  }
`;

export const DELETE_ADMIN = gql`
mutation deleteAdmin($id: ID!) {
  deleteAdmin(id: $id) {
    id
    username
  }
}
`;