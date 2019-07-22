import gql from "graphql-tag";

export const GET_PARKINGS = gql`
  query ParkingsQuery {
    parkings {
      id
      plate
      owner
      values
      comment
      damage
      sign
      token
      returned
      employee {
        user
      }
      serviceshift{
        id
        begindate
        branch{
          id
          branch
        }
      }
      createdAt
      updatedAt
    }
  }
`;
