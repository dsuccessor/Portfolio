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
          <h4 className="card-title fs-3 py-4 text-primary">
            Portfolio Administration
          </h4>
          <div className="row align-items-center justify-content-center gx-3">
            <animated.div
              // style={
              //   loginPage === true ? { ...animateData } : { ...animateData }
              // }
              className="col-9 col-sm-7 col-md-5 col-lg-4 bg-primary"
            >
              <div className="card bg-transparent border-0"> 
                <div className="card-body">
                  <Image
                    className="rounded-circle card-img-top w-75 port-shadow-11"
                    src={loginImage}
                    quality={100}
                    width={200}
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
