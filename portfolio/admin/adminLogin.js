import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import loginImage from "@/public/portfolios/ai-hacker.jpg";

function AdminLogin() {
  const [loginPage, setLoginPage] = useState(true);
  const [animateData, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  useEffect(() => {}, [loginPage]);

  const handleAnimation = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 355,
      },
    });
    setLoginPage(!loginPage);
  };

  const handleAnimation2 = () => {
    api.start({
      from: {
        x: 355,
      },
      to: {
        x: 0,
      },
    });
    setLoginPage(!loginPage);
  };

  const page = () => {
    if (loginPage === true) {
      return (
        <animated.div
          style={
            loginPage === true
              ? {
                  x: animateData.x.to([0, 355], [0, -355]),
                }
              : {
                  x: animateData.x.to([355, 0], [-355, 0]),
                }
          }
          className="col-12 col-sm-6 col-md-4 col-lg-3 rounded-end border border-dark-50 port-shadow-8"
        >
          <div className="card border-0">
            <div className="card-body">
              <div className="mb-0">
                {/* Login Image Box */}
                <div className="mx-2 mb-0 px-5 py-4 bg-primary rounded-bottom rounded-5 port-shadow-11">
                  <h6 className="card-title mt-2 text-white">
                    Administrator Page!
                  </h6>
                </div>

                {/* Login Data Box */}
                <form>
                  <div className="mx-2 my-1 px-4 py-5 border border-primary rounded-top rounded-5 port-shadow-11">
                    {/* Email Address Box */}
                    <input
                      type="text"
                      className="form-control fs-14 mb-3"
                      placeholder="Email"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />

                    {/* Password Box */}
                    <input
                      type="text"
                      className="form-control fs-14 mb-3"
                      placeholder="Password"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />

                    <div className="row mb-4">
                      <div className="col-12 col-md-6">
                        <input
                          type="checkbox"
                          className="float-start form-check-input mt-1 me-2"
                          id="exampleCheck1"
                        />
                        <label
                          className="float-start mt-1 fs-12"
                          for="exampleCheck1"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="col-12 col-md-6 fs-12 pt-1">
                        <Link
                          href=""
                          onClick={handleAnimation}
                          className="text-decoration-none"
                        >
                          Forget password?
                        </Link>
                      </div>
                    </div>

                    <div className="justify-content-center">
                      <button
                        type="button"
                        className="btn bg-primary mx-2 mt-2 port-shadow-11"
                      >
                        Login
                      </button>
                      <button
                        type="reset"
                        className="btn bg-info mx-2 mt-2 port-shadow-11"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </animated.div>
      );
    } else {
      return (
        <animated.div
          style={
            loginPage === true
              ? {
                  x: animateData.x.to([0, 355], [0, -355]),
                }
              : {
                  x: animateData.x.to([355, 0], [-355, 0]),
                }
          }
          className="col-12 col-sm-5 col-md-3 rounded-start border border-dark-50 port-shadow-8"
        >
          <div className="card border-0">
            <div className="card-body">
              <div className="mb-0">
                {/* Reset Password Box */}
                <div className="mx-2 my-1 px-3 py-2 border border-primary rounded-bottom rounded-5 port-shadow-11">
                  <h6 className="card-title py-3 text-primary text-decoration-underline">
                    Password Reset Page!
                  </h6>
                  {/* Email Address Box */}
                  <form>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="float-start fs-14 text-muted form-label"
                      >
                        Email address:
                      </label>
                      <input
                        type="email"
                        className="form-control fs-14"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>

                    <div className="d-flex flex-row justify-content-center">
                      <div className="justify-content-center">
                        <button
                          type="button"
                          className="btn btn-primary my-3 mx-2 port-shadow-11"
                        >
                          Reset
                        </button>
                        <button
                          type="reset"
                          className="btn btn-outline-primary my-3 mx-2 port-shadow-11"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Login Image Box */}
                <div className="mx-2 my-1 px-2 py-4 bg-primary d-flex flex-row justify-content-center rounded-top rounded-5 port-shadow-11">
                  <button
                    // onClick={() => setLoginBox(true)}
                    onClick={handleAnimation2}
                    type="button"
                    className="btn btn-light mx-2 px-4 port-shadow-11"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      );
    }
  };

  console.log(loginPage);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min");
  }, []);

  return (
    <div className="container-fluid text-center">
      <div className="row g-0 align-items-center vh-100">
        <div className="col-12">
          <h4 className="card-title py-3 text-primary">
            Portfolio Administration
          </h4>
          <div className="row align-items-center justify-content-center g-0">
            <animated.div
              style={
                loginPage === true ? { ...animateData } : { ...animateData }
              }
              className="col-12 col-sm-5 col-md-3 p-0 rounded-start"
            >
              <div className="card border-0 m-0 p-0">
                <div className="card-body m-0 p-0">
                  <Image
                    className="card-img-top"
                    src={loginImage}
                    quality={100}
                    width={100}
                    height={445}
                    alt="..."
                  />
                </div>
              </div>
            </animated.div>

            {page()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
