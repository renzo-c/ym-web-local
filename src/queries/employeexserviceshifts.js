import gql from "graphql-tag";

export const GET_EMPLOYEEXSERVICESHIFTS = gql`
  query EmployeesxServiceShifts {
    employeesxserviceshifts {
      id
      photo
      latitude
      longitude
      comment
      start
      employeeId
      serviceshiftId
    }
  }
`;
