import React, { useEffect, useState } from "react";
const { useQuery} = require("@apollo/client");
import NotifyToast from "../toast/NotifyToast";
import "react-toastify/dist/ReactToastify.css";
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
import Portfolio from "../Portfolio";

function PortfolioTable({ getImageClicked, choosenPort }) {
  const [getQuery, setGetQuery] = useState(GET_LANGUAGES);
  const [activeTable, setActiveTable] = useState();
  const [delQuery, setDelQuery] = useState(DEL_LANGUAGE_BY_ID);
  

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

  return (

    <div className="row px-3">

      {
        (loading === true) && <NotifyToast message={"Processing, Please wait...."} />
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
                    <Portfolio 
                    item={item} 
                    choosenPort={choosenPort} 
                    activeTable={activeTable} 
                    getImageClicked={getImageClicked} 
                    getQuery={getQuery}
                    delQuery={delQuery}
                    />
                  );
                })
                : choosenPort === "skill"
                  ? data?.getSkills?.map((item) => {
                    return (
                      <Portfolio 
                    item={item} 
                    choosenPort={choosenPort} 
                    activeTable={activeTable} 
                    getImageClicked={getImageClicked} 
                    getQuery={getQuery}
                    delQuery={delQuery}
                    />

                    );
                  })
                  : choosenPort === "media"
                    ? data?.getMedias?.map((item) => {
                      return (
                        <Portfolio 
                    item={item} 
                    choosenPort={choosenPort} 
                    activeTable={activeTable} 
                    getImageClicked={getImageClicked} 
                    getQuery={getQuery}
                    delQuery={delQuery}
                    />
                      );
                    })
                    : data?.getLanguages?.map((item) => {
                      return (
                        <Portfolio 
                        item={item} 
                        choosenPort={choosenPort} 
                        activeTable={activeTable} 
                        getImageClicked={getImageClicked} 
                        getQuery={getQuery}
                        delQuery={delQuery}
                        />
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
