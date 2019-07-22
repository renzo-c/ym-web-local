import gql from "graphql-tag";

export const NEW_SERVICESHIFT = gql`
  mutation addServiceShift(
    $begindate: DateTime!
    $workspan: DateTime!
    $active: Boolean!
    $branchId: ID!
  ) {
    addServiceShift(
      begindate: $begindate
      workspan: $workspan
      active: $active
      branchId: $branchId
    ) {
      id
      begindate
      workspan
      active
      branch {
        id
        branch
      }
    }
  }
`;

export const ADD_EMPLOYEE_TO_SERVICESHIFT = gql`
  mutation addEmployeeToServiceShift($id: ID!, $employeeId: ID!) {
    addEmployeeToServiceShift(id: $id, employeeId: $employeeId) {
      id
      begindate
      workspan
      branch {
        id
        branch
        address
        latitude
        longitude
        contact
        phone
        active
      }
      employees {
        id
        firstname
        lastname
        user
        dni
        phone
        active
      }
    }
  }
`;

export const DELETE_SERVICESHIFT = gql`
  mutation deleteServiceShift($id: ID!) {
    deleteServiceShift(id: $id) {
      id
      begindate
      workspan
      active
    }
  }
`;

export const DELETE_EMPLOYEE_FROM_SERVICESHIFT = gql`
  mutation deleteEmployeeFromServiceShift($id: ID!, $employeeId: ID!) {
    deleteEmployeeFromServiceShift(id: $id, employeeId: $employeeId) {
      id
      begindate
      workspan
      branch {
        id
        branch
        address
        latitude
        longitude
        contact
        phone
        active
      }
      employees {
        id
        firstname
        lastname
        user
        dni
        phone
        active
      }
    }
  }
`;


export const UPDATE_SERVICESHIFT = gql`
mutation updateServiceShift(
  $id: ID!
  $begindate: DateTime!
  $workspan: DateTime!
  $active: Boolean!
  $branchId: ID!
){
  updateServiceShift(
    id: $id
    begindate: $begindate
    workspan: $workspan
    active: $active
    branchId: $branchId
  ) {
    id
    begindate
    workspan
    active
    branch{
      id
      branch
    }
  }
}
`;

export const DISABLE_SERVICESHIFT = gql`
mutation disableServiceshift($id: ID!) {
  disableServiceshift(id: $id) {
    id
    active
  }
}
`;
