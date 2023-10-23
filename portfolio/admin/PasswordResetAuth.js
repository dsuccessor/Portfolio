import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PASS_RESET_REQ } from "@/libs/query/adminQueries";
import { useLazyQuery } from "@apollo/client";
import NotifyToast from '../toast/NotifyToast';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


function PasswordResetAuth({animate}) {
    const router = useRouter();
    const [resetMail, setResetMail] = useState(null);
    const [PassResetReq, { loading: passReqLoading }] = useLazyQuery(PASS_RESET_REQ);

    const resetPassword = () => {
        PassResetReq({
          variables: { email: resetMail}
        }).then(({ data, error }) => {
          if (data != undefined) {
           sessionStorage.setItem("passResetToken", data?.passResetReq?.token)
            router?.push(`/otpValidation?email=${resetMail}`)
            // toast.success(`An email containing OTP has been sent to ${data?.passResetReq?.email}`, {
            //   position: toast.POSITION.TOP_RIGHT,
            // });
          }
    
          if (error != undefined && error?.message) {
            toast.error(`Password Reset Failed, ${error?.message}`, {
              position: toast.POSITION.TOP_LEFT,
            });
          }
        });
      };

      if (passReqLoading === true)
      return <NotifyToast message={"Password Reset In Progress..."} />;

  return (
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
            onClick={animate}
            type="button"
            className="btn btn-light mx-2 px-4 port-shadow-11"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PasswordResetAuth