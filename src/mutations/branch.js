import gql from "graphql-tag";

export const NEW_BRANCH = gql`
  mutation addBranch(
    $branch: String!
    $address: String!
    $latitude: Float!
    $longitude: Float!
    $contact: String!
    $phone: String!
    $active: Boolean!
  ) {
    addBranch(
      branch: $branch
      address: $address
      latitude: $latitude
      longitude: $longitude
      contact: $contact
      phone: $phone
      active: $active
    ) {
      id
      branch
      address
      latitude
      longitude
      contact
      phone
      active
    }
  }
`;

export const UPDATE_BRANCH = gql`
  mutation updateBranch(
    $id: ID!
    $branch: String
    $address: String
    $latitude: Float
    $longitude: Float
    $contact: String
    $phone: String
    $active: Boolean
  ) {
    updateBranch(
      id: $id
      branch: $branch
      address: $address
      latitude: $latitude
      longitude: $longitude
      contact: $contact
      phone: $phone
      active: $active
    ) {
      id
      branch
      address
      latitude
      longitude
      contact
      phone
      active
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation deleteBranch($id: ID!) {
    deleteBranch(id: $id) {
      id
      branch
      address
      latitude
      longitude
      contact
      phone
      active
    }
  }
`;

export const DISABLE_BRANCH = gql`
  mutation disableBranch($id: ID!) {
    disableBranch(id: $id) {
      id
      active
    }
  }
`;
