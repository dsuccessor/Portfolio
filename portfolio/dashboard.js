import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Link from "next/link";
import passport from "@/public/passport.jpeg";

import Image from "next/image";

import kademyweb2 from "@/public/images/kademyweb2.png";
import kademygroup from "@/public/images/kademygroup3.png";
import kademyboth from "@/public/images/kademyboth.png";
import kademyapp7 from "@/public/images/kademyapp7.png";
import Media from "./user/clientPortfolio/Media";
import { client, ApolloProvider } from "../libs/client";
import Language from "./user/clientPortfolio/Language";
import Project from "./user/clientPortfolio/Project";
import Skill from "./user/clientPortfolio/Skill";
import Objectives from "./user/clientResumee/Objectives";
import Educations from "./user/clientResumee/Educations";
import Experiences from "./user/clientResumee/Experiences";
import Certifications from "./user/clientResumee/Certifications";

function Dashboard() {
  const [portChoice, setPortChoice] = useState("General");
  const [portArr, setPortArr] = useState(0);
  const [portSub, setPortSub] = useState("About Me");
  const [choice, setChoice] = useState();

  const portViews = [
    {
      name: "General",
      type: "General",
      data: ["About Me"],
    },
    {
      name: "Portfolio",
      type: "Portfolio",
      data: ["Languages", "Projects", "Skills", "Media"],
    },
    {
      name: "Resumee",
      type: "Resumee",
      data: ["Objective", "Education", "Experience", "Certificate"],
    },
    {
      name: "CV",
      type: "Curriculum Vitae",
      data: ["Profiles", "Educations", "Certifications", "Experiences"],
    },
    {
      name: "Letter",
      type: "Cover Letter",
      data: ["Profile", "Cover Letter", "Merits/Awards", "Others"],
    },
  ];

  return (
    <Layout pageTitle={"Dashboard"}>
      <ApolloProvider client={client}>
        <div className="container-fluid">
          {/* First Row */}
          <div className="row rounded-5 bg-white my-3 g-2 pb-2 px-2 mx-4 port-shadow-8 text-center">
            {portViews?.map((item, index) => {
              return (
                <Link
                  key={index}
                  className={
                    item.type === portChoice
                      ? "col-3 col-md col-lg-2 bg-primary text-white rounded-5 p-3 mx-2 nav-link"
                      : "col-3 col-md col-lg-2 border text-secondary border-opacity-10 rounded-5 p-3 mx-2 nav-link"
                  }
                  onClick={() => {
                    setPortChoice(item.type);
                    setPortArr(portViews?.indexOf(item));
                    setPortSub(item.data[0]);
                  }}
                  href={""}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Second Row */}
          <div className="row gx-3 px-4">
            {portViews[portArr]?.data?.map((item, index) => {
              return (
                <div key={index} className="col-12 col-md-6 col-lg mb-3">
                  <div
                    className={
                      item === portSub
                        ? "bg-primary text-primary bg-opacity-25 border-0 rounded-3 port-shadow-8"
                        : "bg-white text-secondary border-0 rounded-3 port-shadow-8"
                    }
                  >
                    <Link
                      className="col p-3 nav-link"
                      href={""}
                      onClick={() => {
                        setPortSub(item);
                      }}
                    >
                      {item}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Details */}
          <div className="row mx-4">
            {/* About Me */}
            <div
              className={
                portSub === "About Me"
                  ? "col-12 text-center"
                  : "d-none col-12 text-center"
              }
            >
              <div className="card text-center p-0 mb-3 border-0 bg-transparent">
                <div className="card-body p-0 m-0">
                  <div className="row p-0 m-0">
                    <div className="col-12 p-0 m-0">
                      <div
                        id="carouselExampleControls"
                        className="carousel slide"
                        data-bs-ride="carousel"
                      >
                        <div className="carousel-inner">
                          <div className="carousel-item active">
                            <Image
                              src={kademygroup}
                              //className="d-block w-100"
                              quality={100}
                              alt="logo"
                            />
                          </div>
                          <div className="carousel-item">
                            <Image
                              src={kademyweb2}
                              //className="d-block w-100"
                              quality={100}
                              alt="logo"
                            />
                          </div>
                          <div className="carousel-item">
                            <Image
                              src={kademyboth}
                              //className="d-block w-100"
                              quality={100}
                              alt="logo"
                            />
                          </div>
                          <div className="carousel-item">
                            <Image
                              src={kademyapp7}
                              //className="d-block w-100"
                              quality={100}
                              alt="logo"
                            />
                          </div>
                        </div>
                        <button
                          className="carousel-control-prev"
                          type="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="prev"
                        >
                          <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button
                          className="carousel-control-next"
                          type="button"
                          data-bs-target="#carouselExampleControls"
                          data-bs-slide="next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card text-center px-0 border-0 port-shadow-8 mb-3">
                <div className="card-header bg-white fw-bolder text-primary">
                  #About Me
                </div>
                <div className="card-body">
                  <div className="row text-start align-items-center">
                    <div className="col-12 col-md-5 mb-5 mb-lg-0">
                      <div className="text-center mt-4">
                        <Image
                          src={passport}
                          width={350}
                          height={350}
                          alt="logo"
                          className="rounded-circle border border-1 border-primary"
                        />
                        <div className="mt-3">
                          <h5 className="card-title fw-bolder m-0 text-primary">
                            SALAUDEEN, K.R
                          </h5>
                          <h6 className="card-title">(MERN)</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-7 text-end pe-3 pe-lg-4">
                      <h4 className="card-title my-2">
                        FULL-STACK DEVELOPER & MOBILE ENGINEER
                      </h4>
                      <h2 className="card-title fw-bolder mb-3 text-primary">
                        Kehinde Ridwan
                        <br /> SALAUDEEN
                      </h2>
                      <div className="col-10 text-secondary port-text-justify border-end pe-3 border-2 border-primary float-end">
                        I&#39;m a full-stack MERN (web & mobile app) developer
                        with 2 years of personal technical experience in
                        developing a scalable and market-functioning web &
                        mobile applications using javaScript libraies (react,
                        react-native & node JS). <br />
                        Apart from my personal experience, I have work with
                        finTech companies in different capacities round the
                        sector. I have also build myself in many soft skills
                        like effectve communication, data analytics, problem
                        solving, team leading, creative and critical thinking
                        among others.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-white text-muted border-0">
                  2 days ago
                </div>
              </div>
            </div>

            {/* Languages */}
            <div
              className={
                portSub === "Languages"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              {<Language />}
            </div>

            {/* Projects */}
            <div
              className={
                portSub === "Projects"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              {<Project />}
            </div>

            {/* Skills */}
            <div
              className={
                portSub === "Skills"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <Skill />
            </div>

            {/* Media */}
            <div
              className={
                portSub === "Media"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <Media />
            </div>

            {/* Objective */}
            <div
              className={
                portSub === "Objective"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white fw-bold">
                #Professional Summary
              </div>
              <div className="card-body bg-light">{<Objectives />}</div>
            </div>

            {/* Education */}
            <div
              className={
                portSub === "Education"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white fw-bold">
                #Educational Background
              </div>
              <div className="card-body bg-light">
                <Educations />
              </div>
            </div>

            {/* Experience */}
            <div
              className={
                portSub === "Experience"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white fw-bold">#Experience</div>
              <div className="card-body bg-light">{<Experiences />}</div>
            </div>

            {/* Language */}
            <div
              className={
                portSub === "Language"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white">Language</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>

            {/* Certificate */}
            <div
              className={
                portSub === "Certificate"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white fw-bold">#Certificate</div>
              <div className="card-body">{<Certifications />}</div>
            </div>
            {/* Profiles */}
            <div
              className={
                portSub === "Profiles"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white">Profiles</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>

            {/* Educations */}
            <div
              className={
                portSub === "Educations"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-body">Educations</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>

            {/* Certifications */}
            <div
              className={
                portSub === "Certifications"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white">Certifications</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>

            {/* Experiences */}
            <div
              className={
                portSub === "Experiences"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white">Experiences</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>

            {/* Profile */}
            <div
              className={
                portSub === "Profile"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white">Profile</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>

            {/* Cover Letter */}
            <div
              className={
                portSub === "Cover Letter"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white">Cover Letter</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>

            {/* Merits/Awards */}
            <div
              className={
                portSub === "Merits/Awards"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white">Merits/Awards</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>

            {/* Others */}
            <div
              className={
                portSub === "Others"
                  ? "card text-center px-0 border-0 port-shadow-8"
                  : "d-none card text-center px-0 border-0 port-shadow-8"
              }
            >
              <div className="card-header bg-white">Others</div>
              <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
              <div className="card-footer bg-white text-muted border-0">
                2 days ago
              </div>
            </div>
          </div>
        </div>
      </ApolloProvider>
    </Layout>
  );
}

export default Dashboard;
