import { gql } from "@apollo/client";

// Objective Queries
const ADD_OBJCTIVE = gql`
  mutation AddObj(
    $version: String!
    $summary: String!
    $logo: String!
  ) {
    addObjective(
      version: $version
      summary: $summary
      logo: $logo
    ) {
      id
      version
      summary
      logo
      createdAt
      updatedAt
    }
  }
`;

const GET_OBJECTIVES = gql`
  query {
    getObjectives {
      id
      version
      summary
      logo
      createdAt
      updatedAt
    }
  }
`;

const GET_OBJECTIVE_BY_ID = gql`
  query GetObjById($id: ID!)
  {
    getObjectiveById(id: $id)
    {
      id
      version
      summary
      logo
      createdAt
      updatedAt
    }
  }
`;

const DEL_OBJECTIVE_BY_ID = gql`
  mutation DelObjById($id: ID!)
  {
    deleteObjectiveById(id: $id)
    {
      id
      version
      summary
      logo
      createdAt
      updatedAt
    }
  }
`;

const UPD_OBJECTIVE_BY_ID = gql`
  mutation UpdateObjById(
    $id: ID!
    $version: String
    $summary: String
    $logo: String
  ) {
    updateObjectiveById(
      id: $id
      version: $version
      summary: $summary
      logo: $logo
    ) {
      id
      version
      summary
      logo
      createdAt
      updatedAt
    }
  }
`;



// Education Queries
const ADD_EDUCATION = gql`
  mutation AddEdu(
    $school: String!
    $period: String!
    $qualification: String!
    $course: String!
    $grade: String!
  ) {
    addEducation(
      school: $school
      period: $period
      qualification: $qualification
      course: $course
      grade: $grade
    ) {
      id
      school
      period
      qualification
      course
      grade
      createdAt
      updatedAt
    }
  }
`;

const GET_EDUCATIONS = gql`
  query {
    getEducations {
      id
      school
      period
      qualification
      course
      grade
      createdAt
      updatedAt
    }
  }
`;

const GET_EDUCATION_BY_ID = gql`
  query GetEduById($id: ID!)
  {
    getEducationById(id: $id) 
    {
      id
      school
      period
      qualification
      course
      grade
      createdAt
      updatedAt
    }
  }
`;

const DEL_EDUCATION_BY_ID = gql`
  mutation DelEduById($id: ID!)
  {
    deleteEducationById(id: $id) 
    {
      id
      school
      period
      qualification
      course
      grade
      createdAt
      updatedAt
    }
  }
`;

const UPD_EDUCATION_BY_ID = gql`
  mutation UpdateEduById(
    $id: ID!
    $school: String
    $period: String
    $qualification: String
    $course: String
    $grade: String
  ) {
    updateEducationById(
      id: $id
      school: $school
      period: $period
      qualification: $qualification
      course: $course
      grade: $grade
    ) {
      id
      school
      period
      qualification
      course
      grade
      createdAt
      updatedAt
    }
  }
`;



// Experience Queries
const ADD_EXPERIENCE = gql`
  mutation AddExp(
    $organization: String!
    $role: String!
    $position: String!
    $period: String!
  ) {
    addExperience(
      organization: $organization
      role: $role
      position: $position
      period: $period
    ) {
      id
      organization
      role
      position
      period
      createdAt
      updatedAt
    }
  }
`;

const GET_EXPERIENCES = gql`
  query {
    getExperiences {
      id
      organization
      role
      position
      period
      createdAt
      updatedAt
    }
  }
`;

const GET_EXPERIENCE_BY_ID = gql`
  query GetExpById($id: ID!) {
    getExperienceById(id: $id) {
      id
      organization
      role
      position
      period
      createdAt
      updatedAt
    }
  }
`;

const DEL_EXPERIENCE_BY_ID = gql`
  mutation DelExpById($id: ID!) {
    deleteExperienceById(id: $id) {
      id
      organization
      role
      position
      period
      createdAt
      updatedAt
    }
  }
`;

const UPD_EXPERIENCE_BY_ID = gql`
  mutation UpdateExpById(
    $id: ID!
    $organization: String
    $role: String
    $position: String
    $period: String
  ) {
    updateExperienceById(
      id: $id
      organization: $organization
      role: $role
      position: $position
      period: $period
    ) {
      id
      organization
      role
      position
      period
      createdAt
      updatedAt
    }
  }
`;



// Certificate Queries
const ADD_CERTIFICATE = gql`
  mutation AddCert(
    $programme: String!
    $period: String!
    $certificate: String!
    $certification: String!
  ) {
    addCertification(
      programme: $programme
      period: $period
      certificate: $certificate
      certification: $certification
    ) {
      id
      programme
      period
      certificate
      certification
      createdAt
      updatedAt
    }
  }
`;

const GET_CERTIFICATES = gql`
  query {
    getCertifications {
      id
      programme
      period
      certificate
      certification
      createdAt
      updatedAt
    }
  }
`;

const GET_CERTIFICATE_BY_ID = gql`
  query GetCertById($id: ID!){
    getCertificationById(id: $id) {
      id
      programme
      period
      certificate
      certification
      createdAt
      updatedAt
    }
  }
`;

const DEL_CERTIFICATE_BY_ID = gql`
  mutation DelCertById($id: ID!){
    deleteCertificationById(id: $id) {
      id
      programme
      period
      certificate
      certification
      createdAt
      updatedAt
    }
  }
`;

const UPD_CERTIFICATE_BY_ID = gql`
  mutation UpdateCertById(
    $id: ID!
    $programme: String
    $period: String
    $certificate: String
    $certification: String
  ) {
    updateCertificateById(
      id: $id
      programme: $programme
      period: $period
      certificate: $certificate
      certification: $certification
    ) {
      id
      programme
      period
      certificate
      certification
      createdAt
      updatedAt
    }
  }
`;


export {
ADD_CERTIFICATE,
ADD_EDUCATION,
ADD_EXPERIENCE,
ADD_OBJCTIVE,
GET_CERTIFICATES,
GET_CERTIFICATE_BY_ID,
GET_EDUCATIONS,
GET_EDUCATION_BY_ID,
GET_EXPERIENCES,
GET_EXPERIENCE_BY_ID,
GET_OBJECTIVES,
GET_OBJECTIVE_BY_ID,
UPD_CERTIFICATE_BY_ID,
UPD_EDUCATION_BY_ID,
UPD_EXPERIENCE_BY_ID,
UPD_OBJECTIVE_BY_ID,
DEL_CERTIFICATE_BY_ID,
DEL_EDUCATION_BY_ID,
DEL_EXPERIENCE_BY_ID,
DEL_OBJECTIVE_BY_ID,
};
