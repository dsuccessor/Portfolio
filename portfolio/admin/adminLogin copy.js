import React, { useEffect } from "react";
import Image from "next/image";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import loginImage from "@/public/portfolios/ai-generated.jpg";

function AdminLogin() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min");
  }, []);

  return (
    <div className="container-fluid text-center bg-primary">
      <div className="row g-0 align-items-center vh-100">
        <div className="col-12">
          <h4 className="card-title py-3 text-light">
            Portfolio Administration
          </h4>
          <div className="row g-0 justify-content-center">
            <div className="col-12 col-sm-5 col-md-3 bg-dark p-0">
              <div className="card border-0 m-0 p-0">
                <div className="card-body m-0 p-0">
                  <Image
                    className="card-img-top"
                    src={loginImage}
                    quality={100}
                    width={100}
                    height={200}
                    alt="..."
                  />
                </div>
              </div>
            </div>
            <div className="rounded-end col-12 col-sm-6 col-md-4 col-lg-3 bg-light port-shadow-8">
              <div className="card border-0">
                <div className="card-body">
                  <h6 className="card-title mt-0 text-primary">
                    Administrator Page!
                  </h6>
                  <form>
                    <div className="mb-2">
                      <input
                        type="email"
                        className="form-control fs-12"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="email..."
                      />
                    </div>
                    <div className="mb-1">
                      <input
                        type="password"
                        className="form-control fs-12"
                        id="exampleInputPassword1"
                        placeholder="password..."
                      />
                    </div>
                    <div className="mb-2 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label
                        className="form-check-label fs-12 float-start pt-1"
                        for="exampleCheck1"
                      >
                        Keep me signed-In
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-primary px-3  me-3"
                    >
                      Login
                    </button>
                    <button type="reset" className="btn btn-sm btn-danger px-3">
                      Clear
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
