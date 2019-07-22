import gql from "graphql-tag";

export const NEW_EMPLOYEE = gql`
mutation addEmployee(
  $firstname: String!
  $lastname: String!
  $user: String!
  $password: String!
  $dni: String!
  $phone: String!
  $active: Boolean!
) {
  addEmployee(
    firstname: $firstname
    lastname: $lastname
    user: $user
    password: $password
    dni: $dni
    phone: $phone
    active: $active
  ) {
    id
    firstname
    lastname
    user
    password
    dni
    phone
    active
  }
}
`;

export const UPDATE_EMPLOYEE = gql`
mutation updateEmployee(
  $firstname: String
  $lastname: String
  $user: String!
  $password: String
  $dni: String
  $phone: String
  $active: Boolean
){
  updateEmployee(
    firstname: $firstname
    lastname: $lastname
    password: $password
    user: $user
    dni: $dni
    phone: $phone
    active: $active
  ) {
    id
    firstname
    lastname
    user
    dni
    phone
    active
  }
}
`;

export const DISABLE_EMPLOYEE = gql`
mutation disableEmployee($user: String!) {
  disableEmployee(user: $user) {
    user
    active
  }
}
`;

export const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($user: String!) {
  deleteEmployee(user: $user) {
    id
    firstname
    lastname
    user
    dni
    phone
    active
  }
}
`;