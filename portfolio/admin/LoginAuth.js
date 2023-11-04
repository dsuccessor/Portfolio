import React, { useEffect, useState } from "react";
import Link from "next/link";
import { VALIDATE_LOGIN } from "@/libs/query/adminQueries";
import { useLazyQuery } from "@apollo/client";
import NotifyToast from '../toast/NotifyToast';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function LoginAuth({animate}) {
    const router = useRouter();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [validateLogin, { loading }] = useLazyQuery(VALIDATE_LOGIN);

    if (loading === true)
    return <NotifyToast message={"Confirming your credentials..."} />;

    const confirmLogin = () => {
        validateLogin({
          variables: { email: email, password: password }
        }).then(({ data, error }) => {
          if (data && data != null && data != undefined) {
            // router.push("/adminProfile")
            window.location.href = "/adminProfile"
            // window.location.replace("/adminProfile")
            sessionStorage.setItem("loginToken", data?.validateUser?.token)
            sessionStorage?.setItem("activeAdminUser", JSON?.stringify(data?.validateUser))
          }
    
          if (error != undefined && error?.message) {
            toast.error(`Validation Failed, ${error?.message}`, {
              position: toast.POSITION.TOP_LEFT,
            });
          }
        });
      };

  return (
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
        <form name="loginForm" method="POST" encType="">
          <div className="mx-2 my-1 px-4 py-5 border border-primary rounded-top rounded-5 port-shadow-11">
            {/* Email Address Box */}
            <input
              type="text"
              name="email"
              className="form-control fs-14 mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              id="basic-url"
              aria-describedby="basic-addon3"
            />

            {/* Password Box */}
            <input
              type="password"
              value={password}
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
                onClick={confirmLogin}
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
                  onClick={animate}
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
  )
}

export default LoginAuth