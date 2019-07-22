import gql from "graphql-tag";

export const GET_EMPLOYEES = gql`
  query EmployeesQuery {
    employees {
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