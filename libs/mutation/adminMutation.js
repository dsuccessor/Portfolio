import { gql } from "@apollo/client";

const DEL_ADMIN = gql`
  mutation adminDelete($id: ID!) {
    deleteAdminById(id: $id) {
      id
      surname
      otherName
      email
      adminType
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_ADMIN = gql`
  mutation UpdateAdmin(
    $id: ID!
    $email: String!
    $password: String!
    $adminType: updateAdminType
  ) {
    updateAdminById(
      id: $id
      email: $email
      password: $password
      adminType: $adminType
    ) {
      id
      surname
      otherName
      email
      adminType
      createdAt
      updatedAt
    }
  }
`;

const ADD_ADMINS = gql`
  mutation AddAdmin(
    $surname: String!
    $otherName: String!
    $email: String!
    $passport: String!
    $password: String!
    $adminType: addAdminType
  ) {
    addAdmin(
      surname: $surname
      otherName: $otherName
      email: $email
      passport: $passport
      password: $password
      adminType: $adminType
    ) {
      id
      surname
      otherName
      email
      adminType
      createdAt
      updatedAt
    }
  }
`;

export { DEL_ADMIN, UPDATE_ADMIN, ADD_ADMINS };
