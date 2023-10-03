import React, { useState } from "react";
import Image from "next/image";
import { GET_CERTIFICATES } from "@/libs/query/resumeeQueries";
const { useQuery } = require("@apollo/client");
import { toTitleCase } from "@/libs/titleCase";

function Certificate() {
  const { loading, data, error } = useQuery(GET_CERTIFICATES);
  return (
    <div className="container">
      <div className="row">
        {data?.getCertifications?.map((cert, index) => {
          return (
            <div className="col-4 mb-3">
              <div className="card border-light port-shadow-8">
                <div class="card-body">
                  <h5 className="card-title text-primary">
                    {toTitleCase(cert?.certification)}
                  </h5>
                  <div className="px-5">
                    <p className="card-text mb-2 text-dark fs-14 text-bg-light mx-5">
                      {toTitleCase(cert?.period)}
                    </p>
                  </div>
                </div>
                <Image
                  src={cert?.certificate}
                  className="card-img-top"
                  quality={100}
                  width={100}
                  height={200}
                  alt="..."
                />
                <div class="card-body">
                  <h5 className="card-title text-primary">
                    {toTitleCase(cert?.programme)}
                  </h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Certificate;
