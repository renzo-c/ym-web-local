import gql from "graphql-tag";

export const DELETE_EMPLOYEEXSERVICESHIFT = gql`
  mutation deleteEmployeexserviceshift($id: ID!, $employeeId: ID!) {
    deleteEmployeexserviceshift(id: $id, employeeId: $employeeId) {
      id
    }
  }
`;