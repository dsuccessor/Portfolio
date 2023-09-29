import React, { useState } from "react";
import Image from "next/image";
import { GET_SKILLS } from "../../../libs/query/portfolioQueries";
import { useQuery } from "@apollo/client";

function Skill() {
  const [langRate, setLangRate] = useState({
    professional: "95%",
    advance: "85%",
    intermediate: "65%",
    beginner: "45%",
  });

  const { data, loading, error } = useQuery(GET_SKILLS);

  return (
    <>
      <div className="card-header bg-white fw-bolder text-primary">#Skills</div>
      <div className="card-body">
        <div className="row text-start align-items-center">
          <div className="col-12 col-md-6 mb-5 mb-lg-0">
            <div className="row row-cols-3 justify-content-center">
            {error && (
              <div className="text-center text-danger fs-6 my-2">
                {"Unable to load data: " + error?.message}
              </div>
            )}
              {data?.getSkills?.map((item) => {
                return (
                  <div className="col" key={item?.id}>
                    <div className="text-center mt-4">
                      <Image
                        src={item?.logo}
                        width={50}
                        height={50}
                        alt="logo"
                      />
                      <div className="mt-3">
                        <h6 className="nav-link m-0 text-primary">
                          {item?.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-12 col-md-6 pt-3 mb-3 px-4 mb-lg-0">
            {data?.getSkills?.map((item) => {
              return (
                <div className="row mb-3" key={item?.id}>
                  <div className="col-8">
                    <div className="progress">
                      <div
                        className={
                          item?.level === "professional"
                            ? "progress-bar progress-bar-striped progress-bar-animated bg-success"
                            : item?.level === "advance"
                            ? "progress-bar progress-bar-striped progress-bar-animated bg-primary"
                            : item?.level === "intermediate"
                            ? "progress-bar progress-bar-striped progress-bar-animated bg-warning"
                            : "progress-bar progress-bar-striped progress-bar-animated bg-danger"
                        }
                        role="progressbar"
                        aria-label="Default striped example"
                        style={
                          item?.level === "professional"
                            ? { width: "95%" }
                            : item?.level === "advance"
                            ? { width: "85%" }
                            : item?.level === "intermediate"
                            ? { width: "65%" }
                            : { width: "45%" }
                        }
                        aria-valuenow="10"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {item?.level === "professional"
                          ? langRate.professional
                          : item?.level === "advance"
                          ? langRate.advance
                          : item?.level === "intermediate"
                          ? langRate.intermediate
                          : langRate.beginner}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <h5 className="nav-link text-muted text-end">
                      {item?.name}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="card-footer bg-white text-muted border-0">2 days ago</div>
    </>
  );
}

export default Skill;
