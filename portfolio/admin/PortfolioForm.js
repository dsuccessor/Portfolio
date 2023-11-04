import React, { useEffect, useState } from "react";
import Image from "next/image";
import imageAvatar from "@/public/imageAvatar.png";
import {
  ADD_LANGUAGE,
  ADD_PROJECT,
  ADD_SKILL,
  ADD_MEDIA,
  GET_LANGUAGES,
  GET_PROJECTS,
  GET_SKILLS,
  GET_MEDIAS,
} from "@/libs/query/portfolioQueries";
import { useMutation } from "@apollo/client";
import NotifyToast from "../toast/NotifyToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";

function PortfolioForm({ imagePreview, getPort }) {
  const [portfolioType, setPortfolioType] = useState("");
  const [selectedPassport, setSelectedPassport] = useState("");
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    description: "",
    logo: "",
    level: "",
  });
  const [queryVariable, setQueryVariable] = useState(skillFormData);
  const [getQuery, setGetQuery] = useState(GET_LANGUAGES);
  const [addQuery, setAddQuery] = useState(ADD_LANGUAGE);

  // useEffect(() => {
  // setAddQuery(ADD_LANGUAGE);
  // setGetQuery(GET_LANGUAGES);

  // }, []);
  const [tech, setTech] = useState();
  const [techie, setTechie] = useState([]);

  const [projectFormData, setProjectFormData] = useState({
    name: "",
    description: "",
    flyer: "",
    technologies: [],
  });

  const [mediaFormData, setMediaFormData] = useState({
    name: "",
    handle: "",
    logo: "",
    link: "",
  });

  const choosePortfolioType = (e) => {
    const choice = e.target.value;
    setPortfolioType(choice);
    getPort(choice);

    if (choice === "media") {
      setAddQuery(ADD_MEDIA);
      setQueryVariable(mediaFormData);
    } else if (choice === "project") {
      setAddQuery(ADD_PROJECT);
      setQueryVariable(projectFormData);
    } else if (choice === "skill") {
      setAddQuery(ADD_SKILL);
      setQueryVariable(skillFormData);
    } else {
      setAddQuery(ADD_LANGUAGE);
      setQueryVariable(skillFormData);
    }

    if (choice === "media") {
      setGetQuery(GET_MEDIAS);
    } else if (choice === "project") {
      setGetQuery(GET_PROJECTS);
    } else if (choice === "skill") {
      setGetQuery(GET_SKILLS);
    } else {
      setGetQuery(GET_LANGUAGES);
    }
  };

  const convertPassport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      // Base64 Data URL
      mediaFormData.logo = reader.result;
      skillFormData.logo = reader.result;
      projectFormData.flyer = reader.result;
      setSelectedPassport(reader.result);
      console.log(mediaFormData);
      console.log(skillFormData);
      console.log(projectFormData);
    });
    //formData.passport = URL?.createObjectURL(file);
    //setSelectedPassport(file);
  };

  const levelInput = () => (
    <div className="mb-3 col-12">
      <label htmlFor="exampleInputLevel" className="form-label">
        Level
      </label>
      <select
        className="form-select"
        defaultValue="Select Level"
        aria-label="Default select example"
        onChange={(e) => {
          skillFormData.level = e.target.value;
          //console.log(mediaFormData);
          //console.log(skillFormData);
          //console.log(projectFormData);
        }}
      >
        <option value="">Make a choice</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advance">Advanced</option>
        <option value="Professional">Professional</option>
      </select>
      <div id="LevelHelp" className="form-text text-danger"></div>
    </div>
  );

  const techLinkInput = () => (
    <div className="col-12">
      <label htmlFor="exampleInputTechLink" className="form-label">
        {portfolioType === "project" ? "Technology" : "Link"}
        {(portfolioType === "project" && techie != undefined) && <label className="text-primary">&nbsp;[{techie?.length}]</label>}
      </label>
      <input
        type="text"
        className="form-control"
        id="exampleInputTechLink"
        onChange={(e) => {
          mediaFormData.link = e.target.value;
          setTech(e.target.value);
          //console.log(mediaFormData);
          //console.log(skillFormData);
          //console.log(projectFormData);
        }}
        aria-describedby="nameHelp"
      />
      {portfolioType === "project" && (
        <>
        <h5 className="my-2 text-primary">
        {techie.toString() }
        </h5>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={addTech}
        >
          Add more Tech
        </button>
        </>
      )}
    </div>
  );

  const addTech = (e) => {
    e.preventDefault();
    projectFormData.technologies = [...projectFormData.technologies, tech];
    setTechie(projectFormData?.technologies)
    console.log(projectFormData);
  };

  const [runAddQuery, { loading }] = useMutation(addQuery, {
    refetchQueries: [{ query: getQuery }],
  });

  const createPortfolio = (e) => {
    e.preventDefault();

    runAddQuery({ variables: queryVariable })
      .then((data) => {
        toast.success(`Record added succesfully to ${portfolioType}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      })
      .catch((error) => {
        error &&
          toast.error(
            `Failed to add record to ${portfolioType} DUE TO ${error}`,
            {
              position: toast.POSITION.TOP_LEFT,
            }
          );
      });
  };
  //   if (loading) return <NotifyToast message={"Processing..."} />;

  return (
    <form
      className="form-control border-0 port-shadow-8 p-0"
      name="adminForm"
      onSubmit={createPortfolio}
    >
      {loading && <NotifyToast message={"Processing..."} />}

      <div
        className={
          loading
            ? "is-disabled row p-3 border-0 justify-content-center"
            : "row p-3 border-0 justify-content-center"
        }
      >
        <div className="col-12 border-bottom border-body mb-3">
          <div className="mb-3 col-12 col-sm-6 col-md-5">
            <label htmlFor="exampleInputportfolioType" className="form-label">
              Portfolio Type
            </label>
            <select
              className="form-select"
              defaultValue="language"
              aria-label="Default select example"
              onChange={choosePortfolioType}
            >
              <option value="language">Language</option>
              <option value="project">Project</option>
              <option value="skill">Skill</option>
              <option value="media">Media</option>
            </select>
            <div id="portfolioTypeHelp" className="form-text text-danger"></div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-5">
          <div className="col-12 bg-light mb-3 mb-sm-0 opacity-75 p-3">
            <div className="mb-3 col-12">
              <label htmlFor="exampleInputname" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputname"
                onChange={(e) => {
                  mediaFormData.name = e.target.value;
                  skillFormData.name = e.target.value;
                  projectFormData.name = e.target.value;
                  //console.log(mediaFormData);
                  //console.log(skillFormData);
                  //console.log(projectFormData);
                }}
                aria-describedby="nameHelp"
              />
              <div id="nameHelp" className="form-text text-danger">
                {/* {submit && formData?.name === ""
                ? "name field cannot be left blank"
                : ""} */}
              </div>
            </div>
            {portfolioType === "project" || portfolioType === "media"
              ? techLinkInput()
              : levelInput()}
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-5">
          <div className="col-12 bg-light mb-3 mb-md-0 opacity-75 p-3">
            <div className="mb-3 col-12">
              <label htmlFor="exampleInputdescription" className="form-label">
                {portfolioType === "media" ? "Handle" : "Description"}
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputdescription"
                aria-describedby="descriptionHelp"
                onChange={(e) => {
                  mediaFormData.handle = e.target.value;
                  skillFormData.description = e.target.value;
                  projectFormData.description = e.target.value;
                  //console.log(mediaFormData);
                  //console.log(skillFormData);
                  //console.log(projectFormData);
                }}
              />
              <div id="descriptionHelp" className="form-text text-danger">
                {/* {submit && formData?.description === ""
                ? "Other name field cannot be left blank"
                : ""} */}
              </div>
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="exampleInputLogo" className="form-label">
                {portfolioType === "project" ? "Flyer" : "Logo"}
              </label>
              <input
                type="file"
                className="form-control"
                id="exampleInputLogo"
                aria-describedby="logoHelp"
                onChange={convertPassport}
              />
            </div>
            <button
              //disabled={"loading"}
              type="submit"
              className="btn btn-primary"
            >
              {/* {loading ? "Loading..." : "Submit"} */}
              Submit
            </button>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-2">
          <div className="col-12 p-3">
            <div className="text-center">
              <label htmlFor="exampleInputdescription" className="form-label">
                {portfolioType === "project" ? "Flyer" : "Logo"}
              </label>
            </div>
            <div className="text-center">
              {selectedPassport ? (
                <Image
                  src={selectedPassport}
                  quality={100}
                  width={130}
                  height={150}
                  alt="passport"
                  className="rounded port-shadow-8"
                />
              ) : imagePreview ? (
                <Image
                  src={imagePreview}
                  quality={100}
                  width={130}
                  height={150}
                  alt="passport"
                  className="rounded port-shadow-8"
                />
              ) : (
                <Image
                  src={imageAvatar}
                  quality={100}
                  width={130}
                  height={150}
                  alt="passport"
                  className="rounded port-shadow-8"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PortfolioForm;
