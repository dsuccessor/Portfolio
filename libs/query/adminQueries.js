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

const VALIDATE_LOGIN = gql`
  query validateLogin($email: String! $password: String!){
    validateUser(email: $email password: $password) {
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

const PASS_RESET_REQ = gql`
  query PassResetReq($email: String!){
    passResetReq(email: $email) {
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

const VALIDATE_OTP = gql`
  query ValiidateOtp($email: String! $otp: String!)
  {
    confirmOtp(email: $email otp: $otp) {
      message
    }
  }
`;


export { GET_ADMIN, BULK_ADD_USERS, VALIDATE_LOGIN, PASS_RESET_REQ, VALIDATE_OTP };
