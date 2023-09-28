import React from "react";
import Image from "next/image";
import cardBg from "../../../../public/cards/vecteezycopy.png";
import { GET_MEDIAS } from "../../query/portfolioQueries";
import { ApolloClient, useQuery } from "@apollo/client";
import { client } from "../../client";
import NotifyToast from "../../toast/NotifyToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            {/* LinkedIn */}
            {data?.getMedias?.map((item) => {
              return (
                <div className="col-12 col-lg-6 mb-lg-0">
                  <div className="border border-0 card port-shadow-8 mb-3">
                    <Image
                      className="card-img-top"
                      src={cardBg}
                      quality={100}
                      height={300}
                      alt="background"
                    />

                    <div className="container flex-row media-card-text">
                      <div className="row">
                        <div className="col-6 col-lg-5 pt-5 ps-3">
                          <Image
                            className="rounded-5 mb-0 pb-0 text-card me-3"
                            src={item?.logo}
                            quality={100}
                            height={70}
                            width={70}
                            alt="background"
                          />
                          <h2 className="card-title fw-bolder mt-1 me-4 pe-5 pe-lg-0 me-lg-3 mb-1">
                            {item?.name}
                          </h2>
                          <h6 className="fs-12 me-4 me-lg-3 pe-5 pe-lg-0">
                            {item?.handle}
                          </h6>
                        </div>
                        <div className="col-6 col-lg-7 mt-5 pt-4 text-white ms-0 p-0 ps-md-5 ps-lg-5">
                          <h2 className="fs-5 card-title text-start ms-4 ps-5 mb-1">
                            SALAUDEEN K.R
                          </h2>
                          <div className="ps-2 ms-3">
                            <h3 className="fs-5 text-start ps-4 ms-2 my-2 fw-light">
                              Sofware Engineer
                            </h3>
                            <div className="w-25 border border-2 border-white bg-white ms-4 my-2" />
                          </div>
                          <h3 className="fs-6 text-start mt-3 ms-4 fw-lighter">
                            +234 906 2202 857
                          </h3>
                          <h3 className="fs-6 text-start my-2 ms-3 fw-lighter">
                            {item?.link}
                          </h3>
                          <h3 className="fs-6 text-start ps-1 my-2 fw-lighter">
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
      <div className="card-footer bg-white text-muted border-top-1">
        2 days ago
      </div>
    </>
  );
}

export default Media;
