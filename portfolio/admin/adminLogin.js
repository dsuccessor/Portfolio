import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import loginImage from "@/public/portfolios/ai-hacker.jpg";
import { VALIDATE_LOGIN, PASS_RESET_REQ } from "@/libs/query/adminQueries";
import { useLazyQuery } from "@apollo/client";
import NotifyToast from "../toast/NotifyToast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function AdminLogin() {
  const router = useRouter();
  const [loginPage, setLoginPage] = useState(true);
  
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [resetMail, setResetMail] = useState(null);
  const [animateData, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min");
  }, []);

  const [validateLogin, { loading }] = useLazyQuery(VALIDATE_LOGIN);

  const [PassResetReq, { loading: passReqLoading }] = useLazyQuery(PASS_RESET_REQ);
  
  const handleAnimation = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 315,
      },
    });
    setLoginPage(!loginPage);
  };

  const handleAnimation2 = () => {
    api.start({
      from: {
        x: 315,
      },
      to: {
        x: 0,
      },
    });
    setLoginPage(!loginPage);
  };

  const confirmLogin = () => {
    validateLogin({
      variables: { email: email, password: password }
    }).then(({ data, error }) => {
      if (data && data != null && data != undefined) {
        router.push("/adminProfile")
        sessionStorage?.setItem("activeAdminUser", JSON?.stringify(data?.validateUser))
      }

      if (error != undefined && error?.message) {
        toast.error(`Validation Failed, ${error?.message}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  };

  const resetPassword = () => {
    PassResetReq({
      variables: { email: resetMail}
    }).then(({ data, error }) => {
      if (data != undefined) {
        toast.success(`An email containing OTP has been sent to ${data?.passResetReq?.email}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }

      if (error != undefined && error?.message) {
        toast.error(`Password Reset Failed, ${error?.message}`, {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    });
  };
  

  const page = () => {
    if (loginPage === true) {
      return (
        <animated.div
          style={
            loginPage === true
              ? {
                x: animateData.x.to([0, 315], [0, -315]),
              }
              : {
                x: animateData.x.to([315, 0], [-315, 0]),
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
                <form name="loginForm" encType="" onSubmit={confirmLogin}>
                  <div className="mx-2 my-1 px-4 py-5 border border-primary rounded-top rounded-5 port-shadow-11">
                    {/* Email Address Box */}
                    <input
                      type="text"
                      name="email"
                      className="form-control fs-14 mb-3"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />

                    {/* Password Box */}
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control fs-14 mb-3"
                      placeholder="Password"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />

                    <div className="row mb-2">
                      <div className="col-12">
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
                    </div>

                    <div className="justify-content-center">
                      <button
                        type="submit"
                        className="btn text-white btn-primary mx-2 mt-2 port-shadow-11"
                      // onClick={confirmLogin}
                      >
                        Login
                      </button>
                      <button
                        type="reset"
                        className="btn text-white btn-info mx-2 mt-2 port-shadow-11"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="row my-2">
                      <div className="col-12 fs-12 pt-1">
                        <Link
                          href=""
                          onClick={handleAnimation}
                          className="text-decoration-none"
                        >
                          Forget password?
                        </Link>
                      </div>
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
                x: animateData.x.to([0, 315], [0, -315]),
              }
              : {
                x: animateData.x.to([315, 0], [-315, 0]),
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
                  <form encType="" name="resetForm" onSubmit={resetPassword}>
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="float-start fs-14 text-muted form-label"
                      >
                        Email address:
                      </label>
                      <input
                      name="resMail"
                        type="email"
                        onChange={(e)=> setResetMail(e.target.value)}
                        className="form-control fs-14"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>

                    <div className="d-flex flex-row justify-content-center">
                      <div className="justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-primary my-3 mx-2 port-shadow-11"
                          // onClick={}
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

  if (loading === true)
    return <NotifyToast message={"Confirming your credentials..."} />;

    if (passReqLoading === true)
    return <NotifyToast message={"Password Reset In Progress..."} />;

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
