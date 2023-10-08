import { gql } from "@apollo/client";

const GET_ADMIN = gql`
  query {
    getAdminUsers {
      id
      userId
      surname
      otherName
      email
      role
      passport
      createdAt
      updatedAt
    }
  }
`;

const BULK_ADD_USERS = gql`
  query bulkAdmin {
    bulkAddUsers {
      id
      userId
      surname
      otherName
      email
      role
      passport
      createdAt
      updatedAt
    }
  }
`;

export { GET_ADMIN, BULK_ADD_USERS };
