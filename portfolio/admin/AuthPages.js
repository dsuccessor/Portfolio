import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from './adminLogin';
import PasswordResetAuth from "./PasswordResetAuth";
import LoginAuth from "./LoginAuth";


function AuthPages() {
    const [loginPage, setLoginPage] = useState(true);
    const [animateData, api] = useSpring(() => ({
      from: { x: 0 },
    }));

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
            <LoginAuth animate={handleAnimation}/>
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
          <PasswordResetAuth animate={handleAnimation2}/>
            </animated.div>
          );
        }
      };
  return (
<AdminLogin loginPage={loginPage} animateData={animateData}>
    {page()}
    </AdminLogin>
  )
}

export default AuthPages