import React, { useEffect, useState } from "react";
const { useQuery } = require("@apollo/client");
import { GET_EXPERIENCES } from "@/libs/query/resumeeQueries";
import NotifyToast from "@/portfolio/toast/NotifyToast";

function Experiences() {
  const toTitleCase = (str) => {
    str = str?.toLowerCase();
    str = str.split(" ");
    for (var i = 0; i < str?.length; i++) {
      str[i] = str[i]?.charAt(0)?.toUpperCase() + str[i]?.slice(1);
    }
    return str?.join(" ");
  };
  const { loading, data, error } = useQuery(GET_EXPERIENCES);
  return (
    <div className="row justify-content-evenly">
      {data?.getExperiences?.map((exp) => {
        return (
          <div className="rounded-5 card col-5 m-2 border-light port-shadow-8">
            <div className="row">
              <div className="col bg-primary text-white">
                <div className="card-body text-end pe-0 ps-2 text-white">
                  <h5 className="card-title">
                    {toTitleCase(exp?.organization)}
                  </h5>
                  <p className="card-text mb-2 text-dark fs-14">
                    {toTitleCase(exp?.period)}
                  </p>
                </div>
              </div>
              <div className="col">
                <div className="card-body text-start ps-0 pe-2 text-primary text-opacity-75">
                  <h5 className="card-title">{toTitleCase(exp?.position)}</h5>
                  <a href="#" className="btn btn-sm btn-outline-primary mb-2">
                    {toTitleCase(exp?.role)}
                  </a>
                  <a href="#" className="btn btn-sm btn-outline-primary mb-2">
                    Terminal Mgt.
                  </a>
                  <a href="#" className="btn btn-sm btn-outline-primary">
                    POS & MPOS Apps
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Experiences;
