import { gql } from "@apollo/client";

// Objective Queries
// const ADD_OBJCTIVE = gql`
//   mutation AddObj(
//     $name: String!
//     $description: String!
//     $logo: String!
//     $level: levelOptions!
//   ) {
//     addLanguage(
//       name: $name
//       description: $description
//       logo: $logo
//       level: $level
//     ) {
//       id
//       name
//       description
//       logo
//       level
//       createdAt
//       updatedAt
//     }
//   }
// `;
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
// const GET_LANGUAGE_BY_ID = gql`
//   query GetLangById($id: ID!) {
//     getLanguageById(id: $id) {
//       id
//       name
//       description
//       logo
//       level
//       createdAt
//       updatedAt
//     }
//   }
// `;
// const DEL_LANGUAGE_BY_ID = gql`
//   mutation DelLanguageById($id: ID!) {
//     deleteLanguageById(id: $id) {
//       id
//       name
//       description
//       logo
//       level
//       createdAt
//       updatedAt
//     }
//   }
// `;

// // Project Queries
// const ADD_PROJECT = gql`
//   mutation AddProj(
//     $name: String!
//     $description: String!
//     $flyer: String!
//     $technologies: [String]!
//   ) {
//     addProject(
//       name: $name
//       description: $description
//       flyer: $flyer
//       technologies: $technologies
//     ) {
//       id
//       name
//       description
//       flyer
//       technologies
//       createdAt
//       updatedAt
//     }
//   }
// `;

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

// const GET_PROJECT_BY_ID = gql`
//   query GetProjById($id: ID!) {
//     getProjectById(id: $id) {
//       id
//       name
//       description
//       flyer
//       technologies
//       createdAt
//       updatedAt
//     }
//   }
// `;
// const DEL_PROJECT_BY_ID = gql`
//   mutation DelProjectById($id: ID!) {
//     deleteProjectById(id: $id) {
//       id
//       name
//       description
//       flyer
//       technologies
//       createdAt
//       updatedAt
//     }
//   }
// `;

// // Skill Queries
// const ADD_SKILL = gql`
//   mutation AddSkill(
//     $name: String!
//     $description: String!
//     $logo: String!
//     $level: levelOptions!
//   ) {
//     addSkill(
//       name: $name
//       description: $description
//       logo: $logo
//       level: $level
//     ) {
//       id
//       name
//       description
//       logo
//       level
//       createdAt
//       updatedAt
//     }
//   }
// `;

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

// const GET_SKILL_BY_ID = gql`
//   query GetSkillById($id: ID!) {
//     getSkillById(id: $id) {
//       id
//       name
//       description
//       logo
//       level
//       createdAt
//       updatedAt
//     }
//   }
// `;
// const DEL_SKILL_BY_ID = gql`
//   mutation DelSkillById($id: ID!) {
//     deleteSkillById(id: $id) {
//       id
//       name
//       description
//       logo
//       level
//       createdAt
//       updatedAt
//     }
//   }
// `;

// // Media Queries
// const ADD_MEDIA = gql`
//   mutation AddMedia(
//     $name: String!
//     $handle: String!
//     $logo: String!
//     $link: String!
//   ) {
//     addMedia(name: $name, handle: $handle, logo: $logo, link: $link) {
//       id
//       name
//       handle
//       logo
//       link
//       createdAt
//       updatedAt
//     }
//   }
// `;

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

// const GET_MEDIA_BY_ID = gql`
//   query GetMediaById($id: ID!) {
//     getMediaById(id: $id) {
//       id
//       name
//       handle
//       logo
//       link
//       createdAt
//       updatedAt
//     }
//   }
// `;
// const DEL_MEDIA_BY_ID = gql`
//   mutation DelMediaById($id: ID!) {
//     deleteMediaById(id: $id) {
//       id
//       name
//       handle
//       logo
//       link
//       createdAt
//       updatedAt
//     }
//   }
// `;

export {
  GET_OBJECTIVES,
  //   GET_LANGUAGE_BY_ID,
  //   ADD_LANGUAGE,
  //   DEL_LANGUAGE_BY_ID,
  GET_EDUCATIONS,
  //   GET_PROJECT_BY_ID,
  //   ADD_PROJECT,
  //   DEL_PROJECT_BY_ID,
  GET_EXPERIENCES,
  //   GET_SKILL_BY_ID,
  //   ADD_SKILL,
  //   DEL_SKILL_BY_ID,
  GET_CERTIFICATES,
  //   GET_MEDIA_BY_ID,
  //   ADD_MEDIA,
  //   DEL_MEDIA_BY_ID,
};
