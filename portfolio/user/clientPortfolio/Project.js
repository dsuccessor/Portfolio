import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GET_PROJECTS } from "@/libs/query/portfolioQueries";
import { useQuery } from "@apollo/client";

function Project() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  return (
    <>
      <div className="card-header bg-white fw-bolder text-primary">
        #Projects
      </div>
      <div className="card-body">
        <div className="row gy-3 text-start">
          {data?.getProjects?.map((item) => {
            return (
              <div className="col-12 col-md-6 col-lg-4" key={item?.id}>
                <div className="card p-2">
                  <Image
                    src={item?.flyer}
                    className="p-1 rounded-5 border border-1 border-primary"
                    layout="responsive"
                    width={"90"}
                    height={"100"}
                    alt="logo"
                    quality={100}
                    priority
                  />
                  <div className="card-body">
                    <Link
                      className="h5 card-title text-decoration-none"
                      href="#"
                    >
                      {item?.name}
                    </Link>
                    <p className="card-text mt-2">{item?.description}</p>
                    <div className="row justify-content-center g-3">
                      {item?.technologies?.map((tech, index) => {
                        return (
                          <div className="col-auto" key={index}>
                            <h6 className="btn btn-primary fs-6">{tech}</h6>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card-footer bg-white text-muted border-0">
        {error && (
          <div className="text-center text-danger fs-6 my-2">
            {"Unable to load data: " + error?.message}
          </div>
        )}
      </div>
    </>
  );
}

export default Project;
