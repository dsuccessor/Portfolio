import { gql } from "@apollo/client";

const DEL_ADMIN = gql`
  mutation adminDelete($id: ID!) {
    deleteAdminById(id: $id) {
      id
      adminId
      surname
      otherName
      email
      role
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
    $role: updateRole
  ) {
    updateAdminById(id: $id, email: $email, password: $password, role: $role) {
      id
      adminId
      surname
      otherName
      email
      role
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
    $role: addRole
  ) {
    addAdmin(
      surname: $surname
      otherName: $otherName
      email: $email
      passport: $passport
      password: $password
      role: $role
    ) {
      id
      adminId
      surname
      otherName
      email
      role
      createdAt
      updatedAt
    }
  }
`;

export { DEL_ADMIN, UPDATE_ADMIN, ADD_ADMINS };
