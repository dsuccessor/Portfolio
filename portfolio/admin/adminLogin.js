import React, { useEffect, useState } from "react";
import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import loginImage from "@/public/portfolios/ai-hacker.jpg";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin({children, loginPage, animateData}) {

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

           {children}

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
