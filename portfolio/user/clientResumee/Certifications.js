import React, { useEffect, useState } from "react";
import Image from "next/image";
const { useQuery } = require("@apollo/client");
import { GET_CERTIFICATES } from "@/libs/query/resumeeQueries";
import NotifyToast from "@/portfolio/toast/NotifyToast";
import { toTitleCase } from "@/libs/titleCase";

function Certifications() {
  const { loading, data, error } = useQuery(GET_CERTIFICATES);
  error && <NotifyToast message={JSON.stringify(error)} />;
  return (
    <div className="container">
      <div className="row justify-content-evenly">
        {data?.getCertifications?.map((cert, index) => {
          return (
            <div className="col-10 col-sm-6 col-lg-4 mb-3">
              <div className="card border-light port-shadow-8">
                <div class="card-body">
                  <h6 className="card-title text-primary">
                    {toTitleCase(cert?.certification)}
                  </h6>
                  <p className="card-text mb-2 text-dark fs-14 text-bg-light mx-5">
                    {toTitleCase(cert?.period)}
                  </p>
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
                  <h6 className="card-title text-primary">
                    {toTitleCase(cert?.programme)}
                  </h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Certifications;
