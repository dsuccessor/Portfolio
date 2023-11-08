import React, { useEffect, useState } from "react";
import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import loginImage from "@/public/portfolios/ai-hacker.jpg";
import "react-toastify/dist/ReactToastify.css";

function LoginScreen({children, loginPage, animateData}) {

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.min");
      }, []);
    
    
    
      return (
        <div className="container-fluid text-center">
          <div className="row vh-100">
            <div className="col-12 col-sm-6 bg-primary">
            <div className="row align-items-center justify-content-center h-100">
                <animated.div
                  className="col-12 bg-transparent"
                >
                <h4 className="card-title fs-3 my-4 text-white">
                Portfolio Administration
              </h4>
                  <div className="card bg-transparent border-0"> 
                    <div className="card-body">
                      <Image
                        className="rounded-circle border border-2 border-light card-img-top w-75 port-shadow-11"
                        src={loginImage}
                        quality={100}
                        width={200}
                        height={400}
                        alt="..."
                      />
                    </div>
                  </div>
                </animated.div>
              </div>
            </div>
            <div className="col-12 col-sm-6 bg-white">
            <div className="row align-items-center justify-content-center h-100">
        {children}
        </div>
          </div>
          </div>
        </div>
      );
}

export default LoginScreen