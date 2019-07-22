import gql from "graphql-tag";

export const DELETE_PARKING = gql`
  mutation deleteParking($id: ID!) {
    deleteParking(id: $id) {
      id
      plate
      owner
      values
      comment
      damage
      sign
      token
    }
  }
`;