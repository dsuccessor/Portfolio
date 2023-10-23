import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import NotifyToast from '../toast/NotifyToast';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import AdminLogin from "./adminLogin";
import { VALIDATE_OTP } from "@/libs/query/adminQueries";
import { getAuthToken } from "@/libs/client";

function OtpAuth() {
    const router = useRouter()
    const [userOtp, setOtp] = useState(null);
    const [userEmail, setEmail] = useState(null);
    const [authToken, setAuthToken] = useState(null);
    const [ValiidateOtp, { loading }] = useLazyQuery(VALIDATE_OTP);

    useEffect(() => {
        setEmail(router?.query?.email)
        console.log(router?.query?.email);
    }, []);

    console.log(userEmail);

    const checkOtp = async () => {
      await getAuthToken("passResetToken")
        ValiidateOtp({
            variables: { email: userEmail, otp: userOtp, }
        }).then(({ data, error }) => {
            if (data !== undefined && data?.confirmOtp?.message) {
                toast.success('Otp ' + userOtp + ' confirmed for ' + userEmail, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }

            if (error != undefined && error?.message) {
                toast.error('Verification failed, ' + error?.message, {
                    position: toast.POSITION.TOP_LEFT,
                });
            }
        });
    };
    
    
    if (loading === true)
        return <NotifyToast message={"Confirming OTP Validity..."} />;

    return (
        <AdminLogin>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 rounded-end border border-dark-50 port-shadow-8"
            >
                <div className="card border-0">
                    <div className="card-body">
                        <div className="mb-0">
                            {/* Reset Password Box */}
                            <div className="mx-2 my-1 px-3 py-2 border border-primary rounded-bottom rounded-5 port-shadow-11">
                                <h6 className="card-title py-3 text-primary text-decoration-underline">
                                    OTP Authentication Page!
                                </h6>
                                {/* OTP Box */}
                                <form encType="" name="otpForm" onSubmit={()=>checkOtp()}>
                                    <div className="mb-3">
                                        <label
                                            for="exampleInputEmail1"
                                            className="float-start fs-14 text-muted form-label"
                                        >
                                            Enter Otp:
                                        </label>
                                        <input
                                            name="otpField"
                                            type="text"
                                            onChange={(e) => setOtp(e.target.value)}
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
                                            >
                                                Validate
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


                            <div className="mx-2 my-1 px-2 py-4 bg-primary d-flex flex-row justify-content-center rounded-top rounded-5 port-shadow-11">
                                <button
                                    onClick={()=> router?.push("/login")}
                                    type="button"
                                    className="btn btn-light mx-2 px-4 port-shadow-11"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer/>
                </div>
        </AdminLogin>
    )
}


export default OtpAuth