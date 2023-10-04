import React, { useEffect, useState } from "react";
const { useQuery } = require("@apollo/client");
import { GET_OBJECTIVES } from "@/libs/query/resumeeQueries";
import NotifyToast from "@/portfolio/toast/NotifyToast";

function Objectives() {
  const toTitleCase = (str) => {
    const newStr = str
      .toLowerCase()
      .split(", ")
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(", ");

    return newStr
      .split(". ")
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(". ");
  };

  const { loading, data, error } = useQuery(GET_OBJECTIVES);

  const [allRecords, setAllRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [allPages, setAllPages] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [recordPerPage, setRecordPerPage] = useState(1);

  useEffect(() => {
    const records =
      data?.getObjectives?.length > 0 &&
      Math.floor(data?.getObjectives?.length / recordPerPage);
    setAllRecords(data?.getObjectives?.length);
    setAllPages(records < 1 ? 1 : records);
  }, [data?.getObjectives, recordPerPage]);

  const pageRecords = data?.getObjectives?.slice(
    recordPerPage * currentPage,
    recordPerPage * pageNo
  );

  const next = () => {
    if (pageNo < allPages) {
      setCurrentPage(currentPage + 1);
      setPageNo(pageNo + 1);
    }
  };

  const prev = () => {
    if (pageNo > 1) {
      setCurrentPage(currentPage - 1);
      setPageNo(pageNo - 1);
    }
  };

  return (
    <div>
      {pageRecords?.map((obj, index) => {
        return (
          <div className="accordion mb-3" id="accordionExample">
            <div className="accordion-item border-light port-shadow-8">
              <h2 className="accordion-header text-white" id="headingOne">
                <button
                  className="accordion-button bg-primary text-white"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#" + obj?.version}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  {obj?.version + " Summary"}
                </button>
              </h2>
              <div
                id={obj?.version}
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body port-text-justify">
                  {toTitleCase(obj?.summary)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div>
        <div className="row">
          <div className="col-3 col-md-1">
            <select
              className="form-select border-light port-shadow-8"
              aria-label="Default select example"
              defaultValue={1}
              onChange={(e) => setRecordPerPage(e.target.value)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="col-9 col-md-11">
            <div
              className="btn-group float-end border-light port-shadow-8"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={prev}
                disabled={pageNo == 1}
                // hidden={pageNo == 1}
              >
                <span className="me-3" aria-hidden="true">
                  &laquo;
                </span>
                Prev
              </button>
              <button
                type="button"
                className="btn btn-outline-primary"
                disabled={true}
              >
                {pageNo + "/" + allPages}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={next}
                disabled={pageNo == allPages}
                // hidden={pageNo == allPages}
              >
                Next
                <span className="ms-3" aria-hidden="true">
                  &raquo;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div>{data?.getObjectives[currentPage]?.version}</div>
    //   <div>{data?.getObjectives[currentPage]?.summary}</div>
    //   <div>{data?.getObjectives[currentPage]?.logo}</div>
    //   <div>
    //     <p>"Total Page = " {allPages}</p>
    //     <p>"Current Page = " {pageNo}</p>
    //     <button className="btn btn-success" onClick={next} disabled={pageNo == allPages} hidden={pageNo == allPages}>Next</button>
    //      <button className="btn btn-danger" onClick={prev} disabled={pageNo == 1} hidden={pageNo == 1}>Prev</button>
    //   </div>
    // </div>
  );
}

export default Objectives;
