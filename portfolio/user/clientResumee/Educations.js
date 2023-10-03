import React, { useEffect, useState } from "react";
const { useQuery } = require("@apollo/client");
import { GET_EDUCATIONS } from "@/libs/query/resumeeQueries";
import NotifyToast from "@/portfolio/toast/NotifyToast";

function Educations() {
  const toTitleCase = (str) => {
    str = str?.toLowerCase();
    str = str.split(" ");
    for (var i = 0; i < str?.length; i++) {
      str[i] = str[i]?.charAt(0)?.toUpperCase() + str[i]?.slice(1);
    }
    return str?.join(" ");
  };
  const { loading, data, error } = useQuery(GET_EDUCATIONS);
  return (
    <div className="row justify-content-start">
      {data?.getEducations?.map((edu, index) => {
        return (
          <div className="col-4">
            <div
              className="card border-light port-shadow-8"
              style={{ width: "23rem" }}
            >
              {/* <img src="..." className="card-img-top" alt="..."/> */}
              <div className="card-body text-end border-bottom">
                <h5 className="card-title text-primary text-opacity-75">
                  {toTitleCase(edu?.school)}
                </h5>
                <p className="card-text">{toTitleCase(edu?.qualification)}</p>
                </div>
                <div className="card-body text-end bg-primary">
                <a
                  href="#"
                  className="btn btn-sm btn-outline-light mb-2 me-2"
                >
                  {toTitleCase(edu?.course)}
                </a>
                <a href="#" className="btn btn-sm btn-outline-light mb-2">
                  {toTitleCase(edu?.grade)}
                </a>
                <a href="#" className="btn btn-sm btn-outline-light mb-2">
                  {toTitleCase(edu?.period)}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Educations;
