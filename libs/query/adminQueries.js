import { gql } from "@apollo/client";

const GET_ADMIN = gql`
  query getSchoolPortalDb {
    getAdmins {
      id
      surname
      otherName
      email
      adminType
      passport
      createdAt
      updatedAt
    }
  }
`;

export { GET_ADMIN };
