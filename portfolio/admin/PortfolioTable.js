import React, { useEffect, useState } from "react";
const { useQuery, useMutation } = require("@apollo/client");
import NotifyToast from "../toast/NotifyToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toTitleCase } from "@/libs/titleCase";
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
      <table className="table bg-white table-striped table-hover">
        <thead className="text-start">
          <tr className="bg-info opacity-75 text-white">
            <th className="py-3 ps-3" scope="col" style={{ width: "270px" }}>
              Id
            </th>

            <th className="py-3 ps-3" scope="col">
              Name
            </th>
            <th className="py-3 ps-3" scope="col">
              {choosenPort === "media" ? "Handle" : "Description"}
            </th>
            <th className="py-3 ps-3" scope="col">
              {choosenPort === "project"
                ? "Tech"
                : choosenPort === "media"
                ? "Link"
                : "Level"}
            </th>
            <th className="py-3 ps-3" scope="col">
              Created
            </th>
            <th className="py-3 ps-3" scope="col">
              Updated
            </th>
            <th className="py-3" style={{ width: 10 }} scope="col">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="text-start">
          <div className="text-center text-danger fs-5 my-2">
            {error && "Unable to load record: " + error?.message}
          </div>
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
                    <td className="ps-3" style={{ width: "270px" }}>
                      {item?.id}
                    </td>
                    <td className="ps-3">{toTitleCase(item?.name)}</td>
                    <td className="ps-3">{item?.description?.length}</td>
                    <td className="ps-3">
                      {toTitleCase(item?.technologies?.toString())}
                    </td>
                    <td className="ps-3">{item?.createdAt}</td>
                    <td className="ps-3">{item?.updatedAt}</td>
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
                    <td className="ps-3" style={{ width: "270px" }}>
                      {item?.id}
                    </td>
                    <td className="ps-3">{toTitleCase(item?.name)}</td>
                    <td className="ps-3">{item?.description?.length}</td>
                    <td className="ps-3">{toTitleCase(item?.level)}</td>
                    <td className="ps-3">{item?.createdAt}</td>
                    <td className="ps-3">{item?.updatedAt}</td>
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
                    <td className="ps-3" style={{ width: "270px" }}>
                      {item?.id}
                    </td>
                    <td className="ps-3">{toTitleCase(item?.name)}</td>
                    <td className="ps-3">{toTitleCase(item?.handle)}</td>
                    <td className="ps-3">{toTitleCase(item?.link)}</td>
                    <td className="ps-3">{item?.createdAt}</td>
                    <td className="ps-3">{item?.updatedAt}</td>
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
                    <td className="ps-3" style={{ width: "270px" }}>
                      {item?.id}
                    </td>
                    <td className="ps-3">{toTitleCase(item?.name)}</td>
                    <td className="ps-3">{item?.description?.length}</td>
                    <td className="ps-3">{toTitleCase(item?.level)}</td>
                    <td className="ps-3">{item?.createdAt}</td>
                    <td className="ps-3">{item?.updatedAt}</td>
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
