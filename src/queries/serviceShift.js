import gql from "graphql-tag";

export const GET_SERVICESHIFTS = gql`
  query ServiceShiftsQuery {
    serviceShifts {
      id
      begindate
      workspan
      active
      branch{
        id
        branch
        address
        latitude
        longitude
        contact
        phone
        active
      }
      employees{
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

export const GET_SERVICESHIFTS_BASIC = gql`
  query ServiceShiftsBasicQuery {
    serviceShifts {
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