import { gql } from "@apollo/client";

// Language Queries
const ADD_LANGUAGE = gql`
  mutation AddLang(
    $name: String!
    $description: String!
    $logo: String!
    $level: levelOptions!
  ) {
    addLanguage(
      name: $name
      description: $description
      logo: $logo
      level: $level
    ) {
      id
      name
      description
      logo
      level
      createdAt
      updatedAt
    }
  }
`;

const GET_LANGUAGES = gql`
  query {
    getLanguages {
      id
      name
      description
      logo
      level
      createdAt
      updatedAt
    }
  }
`;

const GET_LANGUAGE_BY_ID = gql`
  query GetLangById($id: ID!) {
    getLanguageById(id: $id) {
      id
      name
      description
      logo
      level
      createdAt
      updatedAt
    }
  }
`;
const DEL_LANGUAGE_BY_ID = gql`
  mutation DelLanguageById($id: ID!) {
    deleteLanguageById(id: $id) {
      id
      name
      description
      logo
      level
      createdAt
      updatedAt
    }
  }
`;

// Project Queries
const ADD_PROJECT = gql`
  mutation AddProj(
    $name: String!
    $description: String!
    $flyer: String!
    $technologies: [String]!
  ) {
    addProject(
      name: $name
      description: $description
      flyer: $flyer
      technologies: $technologies
    ) {
      id
      name
      description
      flyer
      technologies
      createdAt
      updatedAt
    }
  }
`;
const GET_PROJECTS = gql`
  query {
    getProjects {
      id
      name
      description
      flyer
      technologies
      createdAt
      updatedAt
    }
  }
`;
const GET_PROJECT_BY_ID = gql`
  query GetProjById($id: ID!) {
    getProjectById(id: $id) {
      id
      name
      description
      flyer
      technologies
      createdAt
      updatedAt
    }
  }
`;
const DEL_PROJECT_BY_ID = gql`
  mutation DelProjectById($id: ID!) {
    deleteProjectById(id: $id) {
      id
      name
      description
      flyer
      technologies
      createdAt
      updatedAt
    }
  }
`;

// Skill Queries
const ADD_SKILL = gql`
  mutation AddSkill(
    $name: String!
    $description: String!
    $logo: String!
    $level: levelOptions!
  ) {
    addSkill(
      name: $name
      description: $description
      logo: $logo
      level: $level
    ) {
      id
      name
      description
      logo
      level
      createdAt
      updatedAt
    }
  }
`;
const GET_SKILLS = gql`
  query {
    getSkills {
      id
      name
      description
      logo
      level
      createdAt
      updatedAt
    }
  }
`;
const GET_SKILL_BY_ID = gql`
  query GetSkillById($id: ID!) {
    getSkillById(id: $id) {
      id
      name
      description
      logo
      level
      createdAt
      updatedAt
    }
  }
`;
const DEL_SKILL_BY_ID = gql`
  mutation DelSkillById($id: ID!) {
    deleteSkillById(id: $id) {
      id
      name
      description
      logo
      level
      createdAt
      updatedAt
    }
  }
`;

// Media Queries
const ADD_MEDIA = gql`
  mutation AddMedia(
    $name: String!
    $handle: String!
    $logo: String!
    $link: String!
  ) {
    addMedia(name: $name, handle: $handle, logo: $logo, link: $link) {
      id
      name
      handle
      logo
      link
      createdAt
      updatedAt
    }
  }
`;
const GET_MEDIAS = gql`
  query {
    getMedias {
      id
      name
      handle
      logo
      link
      createdAt
      updatedAt
    }
  }
`;
const GET_MEDIA_BY_ID = gql`
  query GetMediaById($id: ID!) {
    getMediaById(id: $id) {
      id
      name
      handle
      logo
      link
      createdAt
      updatedAt
    }
  }
`;
const DEL_MEDIA_BY_ID = gql`
  mutation DelMediaById($id: ID!) {
    deleteMediaById(id: $id) {
      id
      name
      handle
      logo
      link
      createdAt
      updatedAt
    }
  }
`;

export {
  GET_LANGUAGES,
  GET_LANGUAGE_BY_ID,
  ADD_LANGUAGE,
  DEL_LANGUAGE_BY_ID,
  GET_PROJECTS,
  GET_PROJECT_BY_ID,
  ADD_PROJECT,
  DEL_PROJECT_BY_ID,
  GET_SKILLS,
  GET_SKILL_BY_ID,
  ADD_SKILL,
  DEL_SKILL_BY_ID,
  GET_MEDIAS,
  GET_MEDIA_BY_ID,
  ADD_MEDIA,
  DEL_MEDIA_BY_ID,
};
