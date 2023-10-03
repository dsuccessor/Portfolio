import React from "react";
import Image from "next/image";
import cardBg from "@/public/cards/vecteezycopy.png";
import { GET_MEDIAS } from "@/libs/query/portfolioQueries";
import { ApolloClient, useQuery } from "@apollo/client";
import { client } from "@/libs/client";
import NotifyToast from "../../toast/NotifyToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toTitleCase } from "@/libs/titleCase";
import Link from "next/link";

function Media() {
  const { loading, data, error } = useQuery(GET_MEDIAS);

  loading && <NotifyToast message={"Loading..."} />;

  error &&
    toast.error(`Failed to fetch record DUE TO ${error}`, {
      position: toast.POSITION.TOP_LEFT,
    });

  return (
    <>
      <div className="card-header bg-white fw-bolder text-primary">#Media</div>
      <div className="card-body bg-light">
        <div className="container">
          <div className="row">
            <div className="container mb-3 border-light port-shadow-8">
            <div className="row justify-content-evenly">
              {/* LinkedIn */}
              {data?.getMedias?.map((item, index) => {
                return (
                  <div className="col-11 col-md-8 col-lg-5 mx-2 my-3 bg-primary border-light port-shadow-8" key={index}>
                  <div className="row">
                    <div className="col-5 bg-primary align-self-center">
                      <div className="col">
                        <Image
                          className="rounded-5"
                          src={item?.logo}
                          quality={100}
                          height={70}
                          width={70}
                          alt="background"
                        />
                      </div>
                      <div className="col">
                        <h2 className="card-title fw-bolder fs-4 pt-2">
                          {toTitleCase(item?.name)}
                        </h2>
                        <Link
                          className="fs-12 nav-link text-white"
                          href={item?.handle}
                        >
                          {item?.handle}
                        </Link>
                      </div>
                    </div>

                    <div className="col-7 text-primary bg-white">
                      <div className="row justify-content-center">
                        <div className="col my-4">
                          <h2 className="fs-5 card-title text-start ms-4 ps-4 mb-1">
                            SALAUDEEN K.R
                          </h2>
                          <div className="ps-2 ms-3">
                            <h3 className="fs-6 text-start text-dark ps-1 ms-2 my-2 fw-light">
                              Sofware Engineer
                            </h3>
                            <hr className="w-50 bg-primary ms-4 my-2" />
                          </div>
                          <h3 className="fs-13 text-start mt-3 ms-4 fw-lighter">
                            +234 906 2202 857
                          </h3>
                          <h3 className="fs-13 text-start my-2 ms-3 fw-lighter">
                            {item?.link}
                          </h3>
                          <h3 className="fs-13 text-start ps-1 my-2 fw-lighter">
                            salaudeenkr@gmail.com
                          </h3>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
            </div>
          </div>
        </div>
      <div className="card-footer bg-white text-muted border-top-1">
        {error && (
          <div className="text-center text-danger fs-6 my-2">
            {"Unable to load data: " + error?.message}
          </div>
        )}
      </div>
    </>
  );
}

export default Media;
