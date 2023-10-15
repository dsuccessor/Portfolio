import React, { useEffect, useState } from "react";
import Image from "next/image";
import imageAvatar from "@/public/imageAvatar.png";
import { useMutation } from "@apollo/client";
import NotifyToast from "../toast/NotifyToast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_CERTIFICATE, ADD_EDUCATION, ADD_EXPERIENCE, ADD_OBJCTIVE, GET_CERTIFICATES, GET_EDUCATIONS, GET_EXPERIENCES, GET_OBJECTIVES } from "@/libs/query/resumeeQueries";

function ResumeeForm({ imagePreview, getPort }) {
  const [eduFormData, setEduFormData] = useState({
    institution: "",
    period: "",
    qualification: "",
    course: "",
    grade: "",
  });

  const [expFormData, setExpFormData] = useState({
    organization: "",
    role: "",
    position: "",
    period: "",
  });

  const [certFormData, setCertFormData] = useState({
    programme: "",
    period: "",
    certificate: "",
    certification: "",
  });

  const [objFormData, setObjFormData] = useState({
    version: "",
    summary: "",
    logo: "",
  });

  const [portfolioType, setPortfolioType] = useState("");
  const [selectedPassport, setSelectedPassport] = useState("");
  const [queryVariable, setQueryVariable] = useState(eduFormData);
  const [getQuery, setGetQuery] = useState(GET_EDUCATIONS);
  const [addQuery, setAddQuery] = useState(ADD_EDUCATION);
  const [choice, setChoice] = useState("education");

  const resumeeBtn = [
    {
      id: 1,
      title: "Add More",
      value: "addMore"
    },
    {
      id: 5,
      title: "Education",
      value: "education"
    },
    {
      id: 2,
      title: "Certificate",
      value: "certificate"
    },
    {
      id: 3,
      title: "Experience",
      value: "experience"
    },
    {
      id: 4,
      title: "Objective",
      value: "objective"
    }
  ]

  const switchRecord = (action) => {
    if (action?.id !== 1) {
      setChoice(action?.value)
      getPort(action?.value)
      console.log(choice);
    }
  }

  // useEffect(() => {
  // setAddQuery(ADD_EDUCATION);
  // setGetQuery(GET_EDUCATIONS);

  // }, []);

  const choosePortfolioType = (e) => {
    const value = e.target.value
    setChoice(value);
    setPortfolioType(value);
    getPort(value);

    if (value === "certificate") {
      setAddQuery(ADD_CERTIFICATE);
      setQueryVariable(certFormData);
    } else if (value === "experience") {
      setAddQuery(ADD_EXPERIENCE);
      setQueryVariable(expFormData);
    } else if (value === "objective") {
      setAddQuery(ADD_OBJCTIVE);
      setQueryVariable(objFormData);
    } else {
      setAddQuery(ADD_EDUCATION);
      setQueryVariable(eduFormData);
    }

    if (value === "certificate") {
      setGetQuery(GET_CERTIFICATES);
    } else if (value === "experience") {
      setGetQuery(GET_EXPERIENCES);
    } else if (value === "objective") {
      setGetQuery(GET_OBJECTIVES);
    } else {
      setGetQuery(GET_EDUCATIONS);
    }
  };

  const convertPassport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      // Base64 Data URL
      objFormData.logo = reader.result;
      certFormData.certificate = reader.result;
      setSelectedPassport(reader.result);
    });
    //formData.passport = URL?.createObjectURL(file);
    //setSelectedPassport(file);
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

  const eduForm = () => {
    return (
      <form
        className="form-control form-control-sm"
        name="adminForm"
        onSubmit={createPortfolio}
      >
        <div className="row">
          <div className="col-12 col-sm-4 p-0">
            <div className="col-12 bg-light mb-3 mb-sm-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Institution:
                </label>
                <input
                  type="text"
                  name="institution"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    eduFormData.institution = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Qualification:
                </label>
                <input
                  type="text"
                  name="qualification"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    eduFormData.qualification = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Date (From - To):
                </label>
                <input
                  type="text"
                  name="period"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    eduFormData.period = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
              </div>

            </div>
          </div>

          <div className="col-12 col-sm-5 p-o">
            <div className="col-12 bg-light mb-3 mb-md-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputdescription" className="form-label">
                  Course:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputdescription"
                  aria-describedby="descriptionHelp"
                  onChange={(e) => {
                    eduFormData.course = e.target.value;
                  }}
                />
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputdescription" className="form-label">
                  Grade:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputdescription"
                  aria-describedby="descriptionHelp"
                  onChange={(e) => {
                    eduFormData.grade = e.target.value;
                  }}
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

          <div className="col-6 col-sm-3 p-0">
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
    )
  }

  const expForm = () => {
    return (
      <form
        className="form-control form-control-sm"
        name="adminForm"
        onSubmit={createPortfolio}
      >
        <div className="row">
          <div className="col-12 col-sm-4 p-0">
            <div className="col-12 bg-light mb-3 mb-sm-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  organization:
                </label>
                <input
                  type="text"
                  name="organization"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    expFormData.organization = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Role:
                </label>
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    expFormData.role = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
              </div>

            </div>
          </div>

          <div className="col-12 col-sm-5 p-o">
            <div className="col-12 bg-light mb-3 mb-md-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Date (From - To):
                </label>
                <input
                  type="text"
                  name="period"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    expFormData.period = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputdescription" className="form-label">
                  Position:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputdescription"
                  aria-describedby="descriptionHelp"
                  onChange={(e) => {
                    expFormData.position = e.target.value;
                  }}
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

          <div className="col-6 col-sm-3 p-0">
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
    )
  }

  const certForm = () => {
    return (
      <form
        className="form-control form-control-sm"
        name="adminForm"
        onSubmit={createPortfolio}
      >
        <div className="row">
          <div className="col-12 col-sm-4 p-0">
            <div className="col-12 bg-light mb-3 mb-sm-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Programme:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    certFormData.programme = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
                <div id="nameHelp" className="form-text text-danger">
                  {/* {submit && formData?.name === ""
? "name field cannot be left blank"
: ""} */}
                </div>
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Date (From - TO):
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    certFormData.period = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />

              </div>
            </div>
          </div>

          <div className="col-12 col-sm-5 p-o">
            <div className="col-12 bg-light mb-3 mb-md-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputdescription" className="form-label">
                  Certificate
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputdescription"
                  aria-describedby="descriptionHelp"
                  onChange={convertPassport}
                />
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputLogo" className="form-label">
                  Certification:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputLogo"
                  aria-describedby="logoHelp"
                  onChange={(e) => {
                    certFormData.certification = e.target.value;
                  }}
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

          <div className="col-6 col-sm-3 p-0">
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
    )
  }

  const objForm = () => {
    return (
      <form
        className="form-control form-control-sm"
        name="adminForm"
        onSubmit={createPortfolio}
      >
        <div className="row">
          <div className="col-12 col-sm-4 p-0">
            <div className="col-12 bg-light mb-3 mb-sm-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Version:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    objFormData.version = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
              </div>

              <div className="mb-3 col-12">
                <label htmlFor="exampleInputname" className="form-label">
                  Summary:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputname"
                  onChange={(e) => {
                    objFormData.summary = e.target.value;
                  }}
                  aria-describedby="nameHelp"
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-5 p-o">
            <div className="col-12 bg-light mb-3 mb-md-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputdescription" className="form-label">
                  Logo/Flyer:
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleInputdescription"
                  aria-describedby="descriptionHelp"
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

          <div className="col-6 col-sm-3 p-0">
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
    )
  }

  const switchCase = () => {
    switch (choice) {
      case "certificate":
        return certForm()
      case "experience":
        return expForm()
      case "objective":
        return objForm()
      default:
        return eduForm()
    }
  }
  //   if (loading) return <NotifyToast message={"Processing..."} />;

  return (
    <div className="container-fluid">
      <div className="row justify-content-between pb-3 border-bottom border-1 border-info">
        {resumeeBtn.map((action, index) => {
          return (
            <div className="col-2 bg-inforounded-3" key={index} >
              <button type="button" class={action?.id === 1 ? "btn text-white col-12 btn-info py-2" : action?.value === choice ? "btn text-info fw-bold col-12 btn-outline-info py-2" : "btn text-secondary col-12 btn-outline-info py-2"} onClick={() => switchRecord(action)} data-bs-toggle={action?.id === 1 && "modal"} data-bs-target={action?.id === 1 && "#exampleModal"}>
                {action.title}
              </button>
            </div>
          )
        })}

        <div className="col-12">
          <div className="modal modal-lg fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-info">
                  <h1 className="modal-title fs-16 text-secondary" id="exampleModalLabel">Add new {choice} history to your Resumee</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {loading && <NotifyToast message={"Processing..."} />}
                  <div
                    className={
                      loading
                        ? "is-disabled row p-2 border-0 justify-content-center"
                        : "row p-2 border-0 justify-content-center"
                    }
                  >
                    <div className="col-12 border-bottom border-grey mb-3">
                      <div className="mb-3 col-12 col-sm-6 col-md-5">
                        <label htmlFor="exampleInputportfolioType" className="form-label">
                          Portfolio Type
                        </label>
                        <select
                          className="form-select form-select-sm"
                          defaultValue="language"
                          aria-label="Default select example"
                          onChange={choosePortfolioType}
                        >
                          <option value="education">Education</option>
                          <option value="experience">Experience</option>
                          <option value="objective">Objective</option>
                          <option value="certificate">Certificate</option>
                        </select>
                        <div id="portfolioTypeHelp" className="form-text text-danger"></div>
                      </div>
                    </div>
                    {switchCase()}
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeeForm;
