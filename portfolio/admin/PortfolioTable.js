import React, { useEffect, useState } from "react";
const { useQuery, useMutation } = require("@apollo/client");
import NotifyToast from "../toast/NotifyToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_LANGUAGES,
  GET_PROJECTS,
  GET_SKILLS,
  GET_MEDIAS,
  DEL_LANGUAGE_BY_ID,
  DEL_PROJECT_BY_ID,
  DEL_SKILL_BY_ID,
  DEL_MEDIA_BY_ID,
} from "../../libs/query/portfolioQueries";
import { FaTrashAlt, FaGetPocket, FaGitAlt } from "react-icons/fa";
import ToolTips from "../toast/ToolTips";

function PortfolioTable({ getImageClicked, choosenPort }) {
  const [getQuery, setGetQuery] = useState(GET_LANGUAGES);
  const [delId, setDelId] = useState(null);
  const [delQuery, setDelQuery] = useState(DEL_LANGUAGE_BY_ID);
  const [activeTable, setActiveTable] = useState();

  const [DelLanguageById] = useMutation(delQuery);

  const deletePort = () => {
    DelLanguageById({
      variables: { id: delId },
      refetchQueries: [{ query: getQuery }],
    })
      .then((data, loading) => {
        loading && <NotifyToast message={"Delete Processing..."} />;
        data &&
          toast.success(
            `${delId} Record deleted succesfully from ${activeTable}`,
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
    choosenPort === undefined
      ? setActiveTable("Language")
      : setActiveTable(choosenPort);
    if (choosenPort === "media") {
      setGetQuery(GET_MEDIAS);
      setDelQuery(DEL_MEDIA_BY_ID);
    } else if (choosenPort === "project") {
      setGetQuery(GET_PROJECTS);
      setDelQuery(DEL_PROJECT_BY_ID);
    } else if (choosenPort === "skill") {
      setGetQuery(GET_SKILLS);
      setDelQuery(DEL_SKILL_BY_ID);
    } else {
      setGetQuery(GET_LANGUAGES);
      setDelQuery(DEL_LANGUAGE_BY_ID);
    }
  }, [choosenPort]);

  const { loading, data, error } = useQuery(getQuery);

  // {
  //   error &&
  //     toast.error(`Failed to fetch record DUE TO ${error}`, {
  //       position: toast.POSITION.TOP_LEFT,
  //     });
  // }

  const showButtons = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-danger btn-sm mx-2"
          onClick={deletePort}
        >
          <FaTrashAlt />
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm mx-2"
          // onClick={UpdateAdmin}
        >
          <FaGetPocket />
        </button>
      </div>
    );
  };

  return (
    <div className="row px-3 overflow-scroll">
      {loading && <NotifyToast message={"Processing, Please wait...."} />}
      <table className="table bg-white table-striped table-hover table-sm">
        <thead className="text-center">
          <tr className="bg-info opacity-75 text-white">
            <th scope="col">Id</th>
            {/* <th scope="col">
              {choosenPort ? `${choosenPort} Id` : "Lang. Id"}
            </th> */}
            <th scope="col">Name</th>
            <th scope="col">
              {choosenPort === "media" ? "Handle" : "Description"}
            </th>
            <th scope="col">
              {choosenPort === "project"
                ? "Tech"
                : choosenPort === "media"
                ? "Link"
                : "Level"}
            </th>
            <th scope="col">Created</th>
            <th scope="col">Updated</th>
            <th style={{ width: 10 }} scope="col">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="text-center">
          {choosenPort === "project"
            ? data?.getProjects?.map((item) => {
                return (
                  <tr
                    key={item?.id}
                    onClick={() => {
                      //listClick(item?.logo);
                      getImageClicked(item?.flyer);
                      setDelId(item?.id);
                    }}
                  >
                    <td>{item?.id}</td>
                    {/* <td>{item?.projectId}</td> */}
                    <td>{item?.name}</td>
                    <td style={{ width: "400px" }}>{item?.description}</td>
                    <td>{item?.technologies?.length}</td>
                    <td style={{ width: "200px" }}>{item?.createdAt}</td>
                    <td style={{ width: "200px" }}>{item?.updatedAt}</td>
                    <td style={{ width: 10 }}>
                      <ToolTips optionButtons={showButtons} />
                    </td>
                  </tr>
                );
              })
            : choosenPort === "skill"
            ? data?.getSkills?.map((item) => {
                return (
                  <tr
                    key={item?.id}
                    onClick={() => {
                      //listClick(item?.logo);
                      getImageClicked(item?.logo);
                      setDelId(item?.id);
                    }}
                  >
                    <td>{item?.id}</td>
                    {/* <td>{item?.skillId}</td> */}
                    <td>{item?.name}</td>
                    <td style={{ width: "400px" }}>{item?.description}</td>
                    <td>{item?.level}</td>
                    <td style={{ width: "200px" }}>{item?.createdAt}</td>
                    <td style={{ width: "200px" }}>{item?.updatedAt}</td>
                    <td style={{ width: 10 }}>
                      <ToolTips optionButtons={showButtons} />
                    </td>
                  </tr>
                );
              })
            : choosenPort === "media"
            ? data?.getMedias?.map((item) => {
                return (
                  <tr
                    key={item?.id}
                    onClick={() => {
                      //listClick(item?.logo);
                      getImageClicked(item?.logo);
                      setDelId(item?.id);
                    }}
                  >
                    <td>{item?.id}</td>
                    {/* <td>{item?.mediaId}</td> */}
                    <td>{item?.name}</td>
                    <td style={{ width: "400px" }}>{item?.handle}</td>
                    <td>{item?.link}</td>
                    <td style={{ width: "200px" }}>{item?.createdAt}</td>
                    <td style={{ width: "200px" }}>{item?.updatedAt}</td>
                    <td style={{ width: 10 }}>
                      <ToolTips optionButtons={showButtons} />
                    </td>
                  </tr>
                );
              })
            : data?.getLanguages?.map((item) => {
                return (
                  <tr
                    key={item?.id}
                    onClick={() => {
                      //listClick(item?.logo);
                      getImageClicked(item?.logo);
                      setDelId(item?.id);
                    }}
                  >
                    <td>{item?.id}</td>
                    {/* <td>{item?.languageId}</td> */}
                    <td>{item?.name}</td>
                    <td style={{ width: "400px" }}>{item?.description}</td>
                    <td>{item?.level}</td>
                    <td style={{ width: "200px" }}>{item?.createdAt}</td>
                    <td style={{ width: "200px" }}>{item?.updatedAt}</td>
                    <td style={{ width: 10 }}>
                      <ToolTips optionButtons={showButtons} />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default PortfolioTable;
