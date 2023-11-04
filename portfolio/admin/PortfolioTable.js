import React, { useEffect, useState } from "react";
const { useQuery, useMutation } = require("@apollo/client");
import NotifyToast from "../toast/NotifyToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toTitleCase } from "@/libs/titleCase";
import {
  GET_PROJECTS,
  GET_SKILLS,
  GET_MEDIAS,
  DEL_LANGUAGE_BY_ID,
  DEL_PROJECT_BY_ID,
  DEL_SKILL_BY_ID,
  DEL_MEDIA_BY_ID,
  GET_LANGUAGES,
} from "../../libs/query/portfolioQueries";
import { FaTrashAlt, FaGetPocket, FaGitAlt } from "react-icons/fa";
import ToolTips from "../toast/ToolTips";
import Link from "next/link"

function PortfolioTable({ getImageClicked, choosenPort }) {
  const [getQuery, setGetQuery] = useState(GET_LANGUAGES);
  const [delQuery, setDelQuery] = useState(DEL_LANGUAGE_BY_ID);
  const [activeTable, setActiveTable] = useState();

  const [DelLanguageById] = useMutation(delQuery);

  const deletePort = async (delid) => {
    DelLanguageById({
      variables: { id: delid },
      refetchQueries: [{ query: getQuery }],
    })
      .then((data, loading) => {
        loading && <NotifyToast message={"Delete Processing..."} />;
        data &&
          toast.success(
            `${delid} Record deleted succesfully from ${activeTable}`,
            {
              position: toast.POSITION.TOP_LEFT,
            }
          );
      })
      .catch((error) => {
        error &&
          toast.error(
            `Failed to delete ${activeTable} record DUE TO ${error}`,
            {
              position: toast.POSITION.TOP_LEFT,
            }
          );
      });
  };

  useEffect(() => {
    if (choosenPort === "media") {
      setGetQuery(GET_MEDIAS);
      setDelQuery(DEL_MEDIA_BY_ID);
      setActiveTable("Media")
    } else if (choosenPort === "project") {
      setGetQuery(GET_PROJECTS);
      setDelQuery(DEL_PROJECT_BY_ID);
      setActiveTable("Project")
    } else if (choosenPort === "skill") {
      setGetQuery(GET_SKILLS);
      setDelQuery(DEL_SKILL_BY_ID);
      setActiveTable("Skill")
    } else {
      setGetQuery(GET_LANGUAGES);
      setDelQuery(DEL_LANGUAGE_BY_ID);
      setActiveTable("Language")
    }
  }, [choosenPort]);

  const { loading, data, error } = useQuery(getQuery);

  const showActions = (idTODel) => {
    return (
      <div className="py-c-4">
        <Link href="" className="text-danger text-decoration-none me-4" onClick={() => deletePort(idTODel)}>Delete</Link>
        <Link href="" className="text-primary text-decoration-none me-4">Update</Link>
      </div>
    );
  };


  return (
  
    <div className="row px-3">

      {
        loading && <NotifyToast message={"Processing, Please wait...."} />
      }

      <div className="rounded-5 bg-primary px-0 pb-0 pt-2">
        <table className="table rounded-0 table-striped table-hover table-sm m-0">

          <thead className="">
            <tr className="text-white">
              <th className="py-c-4" style={{ width: 200 }}>
                Id
              </th>
              <th className="py-c-4" style={{ width: 200 }}>
                Name
              </th>
              <th className="py-c-4" style={{ width: 200 }}>
                {choosenPort === "media" ? "Handle" : "Description"}
              </th>
              <th className="py-c-4" style={{ width: 200 }}>
                {choosenPort === "project"
                  ? "Tech"
                  : choosenPort === "media"
                    ? "Link"
                    : "Level"}
              </th>
              <th className="py-c-4" style={{ width: 200 }}>
                Created
              </th>
              <th className="py-c-4" style={{ width: 200 }}>
                Updated
              </th>
              <th className="py-c-4 pe-5 text-center">
                Action
              </th>
            </tr>
          </thead>

          {data &&
            <tbody className="bg-light">
              {choosenPort === "project"
                  ? data?.getProjects?.map((item) => {
                    return (
                      <tr key={item?.id}>

                        <td className="py-c-4" style={{ width: "270px" }}>
                          {item?.id}
                        </td>

                        <td className="py-c-4 text-primary" onClick={() =>getImageClicked(item?.flyer)}>
                          <Link href="" className="text-decoration-none">
                            {toTitleCase(item?.name)}
                          </Link>
                        </td>

                        <td className="py-c-4">
                          {item?.description?.length}
                        </td>

                        <td className="py-c-4">
                          {toTitleCase(item?.technologies?.toString())}
                        </td>

                        <td className="py-c-4">{item?.createdAt}</td>

                        <td className="py-c-4">{item?.updatedAt}</td>

                        <td className="pt-4">
                          {showActions(item?.id)}
                        </td>

                      </tr>
                    );
                  })
                  : choosenPort === "skill"
                    ? data?.getSkills?.map((item) => {
                      return (
                        <tr
                          key={item?.id}
                        >
                          <td className="py-c-4 text-primary" style={{ width: "270px" }} onClick={() => {
                            //listClick(item?.logo);
                            getImageClicked(item?.logo);
                            setDelId(item?.id);
                          }}>
                            <Link href="" className="text-decoration-none">{item?.id}</Link>
                          </td>
                          <td className="py-c-4">{toTitleCase(item?.name)}</td>
                          <td className="py-c-4">{item?.description?.length}</td>
                          <td className="py-c-4">{toTitleCase(item?.level)}</td>
                          <td className="py-c-4">{item?.createdAt}</td>
                          <td className="py-c-4">{item?.updatedAt}</td>
                          <td style={{ width: 10 }}>
                          {showActions(item?.id)}
                          </td>
                        </tr>
                      );
                    })
                    : choosenPort === "media"
                      ? data?.getMedias?.map((item) => {
                        return (
                          <tr key={item?.id}>

                            <td className="py-c-4 text-primary" style={{ width: "270px" }} onClick={() => getImageClicked(item?.logo)}>
                              <Link href="" className="text-decoration-none">{item?.id}</Link>
                            </td>

                            <td className="py-c-4"> {toTitleCase(item?.name)} </td>
                            <td className="py-c-4"> {toTitleCase(item?.handle)} </td>
                            <td className="py-c-4">{toTitleCase(item?.link)}</td>
                            <td className="py-c-4">{item?.createdAt}</td>
                            <td className="py-c-4">{item?.updatedAt}</td>
                            <td style={{ width: 10 }}>
                            {showActions(item?.id)}
                            </td>
                          </tr>
                        );
                      })
                      : data?.getLanguages?.map((item) => {
                        return (
                          <tr
                            key={item?.id}
                          >
                            <td className="py-c-4 text-primary" style={{ width: "270px" }} onClick={() => {
                              //listClick(item?.logo);
                              getImageClicked(item?.logo);
                              setDelId(item?.id);
                            }}>
                              <Link href="" className="text-decoration-none">{item?.id}</Link>
                            </td>
                            <td className="py-c-4">{toTitleCase(item?.name)}</td>
                            <td className="py-c-4">{item?.description?.length}</td>
                            <td className="py-c-4">{toTitleCase(item?.level)}</td>
                            <td className="py-c-4">{item?.createdAt}</td>
                            <td className="py-c-4">{item?.updatedAt}</td>
                            <td style={{ width: 10 }}>
                            {showActions(item?.id)}
                            </td>
                          </tr>
                        );
                      })
              }

            </tbody>
          }
        </table>

        {
          error && 
          <div className="col-12 py-3 bg-light border border-top-0 border border-primary">
            <h4 className="modal-title text-center text-danger fs-3"> {error?.message} </h4>
          </div>
        }

      </div>
    </div>
  );
}

export default PortfolioTable;
