import React, { useEffect, useState } from "react";
const { useQuery, useMutation } = require("@apollo/client");
import NotifyToast from "../toast/NotifyToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toTitleCase } from "@/libs/titleCase";
import { FaTrashAlt, FaGetPocket, FaGitAlt } from "react-icons/fa";
import ToolTips from "../toast/ToolTips";
import { DEL_CERTIFICATE_BY_ID, DEL_EDUCATION_BY_ID, DEL_EXPERIENCE_BY_ID, DEL_OBJECTIVE_BY_ID, GET_CERTIFICATES, GET_EDUCATIONS, GET_EXPERIENCES, GET_OBJECTIVES } from "@/libs/query/resumeeQueries";
import { getAuthToken } from "@/libs/client";

function ResumeeTable({ getImageClicked, choosenPort }) {
  const [getQuery, setGetQuery] = useState(GET_EDUCATIONS);
  const [delId, setDelId] = useState(null);
  const [delQuery, setDelQuery] = useState(DEL_EDUCATION_BY_ID);
  const [activeTable, setActiveTable] = useState();

  const [DelById] = useMutation(delQuery);

  const deletePort = () => {
    DelById({
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
      ? setActiveTable("education")
      : setActiveTable(choosenPort);
    if (choosenPort === "certificate") {
      setGetQuery(GET_CERTIFICATES);
      setDelQuery(DEL_CERTIFICATE_BY_ID);
    } else if (choosenPort === "experience") {
      setGetQuery(GET_EXPERIENCES);
      setDelQuery(DEL_EXPERIENCE_BY_ID);
    } else if (choosenPort === "objective") {
      setGetQuery(GET_OBJECTIVES);
      setDelQuery(DEL_OBJECTIVE_BY_ID);
    } else {
      setGetQuery(GET_EDUCATIONS);
      setDelQuery(DEL_EDUCATION_BY_ID);
    }
  }, [choosenPort]);

  const { loading, data, error } = useQuery(getQuery);

  const showButtons = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-danger btn-sm pt-0 mx-1"
          onClick={deletePort}
        >
          <FaTrashAlt size={12} />
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm mx-1 pt-0"
        // onClick={UpdateAdmin}
        >
          <FaGetPocket size={12} />
        </button>
      </div>
    );
  };

  return (
    <div className="row px-3 py-0 mt-0">
      {loading && <NotifyToast message={"Processing, Please wait...."} />}
      <h4 className="text-center fs-14 text-secondary m-0 pb-2">
        {choosenPort === undefined
          ? "Education's Record(s)"
          : toTitleCase(`${choosenPort}'s Record(s)`)}
      </h4>

      <div className="rounded-5 bg-info px-0 pb-0 pt-2">
        <table className="table rounded-0 table-striped table-hover table-sm m-0">
          <thead className="">
            <tr className="text-white">
              <th className="py-c-4">
                Name
              </th>
               <th className="py-c-4">
                {choosenPort === "media" ? "Handle" : "Description"}
              </th>
               <th className="py-c-4">
                {choosenPort === "project"
                  ? "Tech"
                  : choosenPort === "media"
                    ? "Link"
                    : "Level"}
              </th>
               <th className="py-c-4">
                Created
              </th>
               <th className="py-c-4">
                Updated
              </th>
              <th className="py-c-4 pe-4">
                Action
              </th>
            </tr>
          </thead>

          {data &&
            <tbody className="bg-light">
              {choosenPort === "experience"
                ? data?.getExperiences?.map((item) => {
                  return (
                    <tr
                      key={item?.id}
                    >
                       <td className="py-c-4" onClick={() => {
                        //listClick(item?.logo);
                        getImageClicked(item?.flyer);
                        setDelId(item?.id);
                      }}>{toTitleCase(item?.organization)}</td>
                       <td className="py-c-4">{toTitleCase(item?.position)}</td>
                       <td className="py-c-4">
                        {toTitleCase(item?.role)}
                      </td>
                       <td className="py-c-4">{toTitleCase(item?.period)}</td>
                       <td className="py-c-4">{item?.updatedAt}</td>
                      <td style={{ width: 10 }}>
                        <ToolTips optionButtons={showButtons} />
                      </td>
                    </tr>
                  );
                })
                : choosenPort === "objective"
                  ? data?.getObjectives?.map((item) => {
                    return (
                      <tr
                        key={item?.id}
                        onClick={() => {
                          //listClick(item?.logo);
                          getImageClicked(item?.logo);
                          setDelId(item?.id);
                        }}
                      >
                         <td className="py-c-4">{toTitleCase(item?.version)}</td>
                         <td className="py-c-4">{toTitleCase(item?.summary)}</td>
                         <td className="py-c-4">{item?.logo?.slice(0, 10)}</td>
                         <td className="py-c-4">{item?.createdAt}</td>
                         <td className="py-c-4">{item?.updatedAt}</td>
                        <td style={{ width: 10 }}>
                          <ToolTips optionButtons={showButtons} />
                        </td>
                      </tr>
                    );
                  })
                  : choosenPort === "certificate"
                    ? data?.getCertifications?.map((item) => {
                      return (
                        <tr
                          key={item?.id}
                          onClick={() => {
                            //listClick(item?.logo);
                            getImageClicked(item?.logo);
                            setDelId(item?.id);
                          }}
                        >
                           <td className="py-c-4">{toTitleCase(item?.programme)}</td>
                           <td className="py-c-4">{toTitleCase(item?.certification)}</td>
                           <td className="py-c-4">{item?.certificate?.slice(0, 10)}</td>
                           <td className="py-c-4">{item?.period}</td>
                           <td className="py-c-4">{item?.updatedAt}</td>
                          <td style={{ width: 10 }}>
                            <ToolTips optionButtons={showButtons} />
                          </td>
                        </tr>
                      );
                    })
                    : data?.getEducations?.map((item) => {
                      return (
                        <tr
                          className="fs-10"
                          key={item?.id}
                          onClick={() => {
                            //listClick(item?.logo);
                            getImageClicked(item?.logo);
                            setDelId(item?.id);
                          }}
                        >
                           <td className="py-c-4">{toTitleCase(item?.school)}</td>
                           <td className="py-c-4">{item?.period}</td>
                           <td className="py-c-4">{toTitleCase(item?.qualification)}</td>
                           <td className="py-c-4">{toTitleCase(item?.course)}</td>
                           <td className="py-c-4">{toTitleCase(item?.grade)}</td>
                          <td style={{ width: 10 }}>
                            <ToolTips optionButtons={showButtons} />
                          </td>
                        </tr>
                      );
                    })}
            </tbody>
          }

        </table>

        {
          error?.graphQLErrors &&
          <div className="col-12 py-3 bg-light border border-top-0 border border-info">
            <h4 className="modal-title text-center text-danger fs-3"> {error?.message} </h4>
          </div>
        }

        {
          error?.networkError &&
          <div className="col-12 py-3 bg-light border border-top-0 border border-info">
            <h4 className="modal-title text-center text-danger fs-3"> {error?.networkError?.result?.errors[0]?.message} </h4>
          </div>
        }
      </div>
    </div>
  );
}

export default ResumeeTable;
