import React, { useEffect, useState } from "react";
import { animated, useSpring, easings } from "@react-spring/web";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from './adminLogin';
import PasswordResetAuth from "./PasswordResetAuth";
import LoginAuth from "./LoginAuth";
import LoginScreen from "../login/LoginScreen";


function AuthPages() {
  const [loginPage, setLoginPage] = useState(true);

  // const [animateData, api] = useSpring(() => ({
  //   from: { x: 0 },
  // }));


  // const handleAnimation = () => {
  //     api.start({
  //       from: {
  //         x: 0,
  //       },
  //       to: {
  //         x: 365,
  //       },
  //     });
  //     setLoginPage(!loginPage);
  //   };

  // const handleAnimation2 = () => {
  //   api.start({
  //     from: {
  //       x: 350,
  //     },
  //     to: {
  //       x: 0,
  //     },
  //   });
  //   setLoginPage(!loginPage);
  // };

  const [animateData, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 3000,
      easing: easings.steps(3),
    }
  }));

  const [animateData1, api1] = useSpring(() => ({
    from: { opacity: 1 },
    to: { opacity: 0 },
    config: {
      duration: 3000,
      easing: easings.steps(3),
    }
  }));

  const handleAnimation = () => {
    api.start({
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
      config: {
        duration: 3000,
        easing: easings.steps(3),
      }
    });

    api1.start({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        duration: 3000,
        easing: easings.steps(3),
      }
    });
    setLoginPage(!loginPage);
  };

  const handleAnimation2 = () => {
    api.start({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {
        duration: 3000,
        easing: easings.steps(3),
      }
    });

    api1.start({
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
      config: {
        duration: 3000,
        easing: easings.steps(3),
      }
    });
    setLoginPage(!loginPage);
  };

  // const page = () => {
  //   if (loginPage === true) {
  //     return (
  //       <animated.div
  //         // style={
  //         //   loginPage === true
  //         //     ? {
  //         //       x: animateData.x.to([0, 350], [0, -350]),
  //         //     }
  //         //     : {
  //         //       x: animateData.x.to([350, 0], [-350, 0]),
  //         //     }
  //         // }
  //         style={animateData.opacity.to([0, 100], [0, 1])}
  //         className="col-9 col-sm-7 col-md-5 col-lg-3"
  //       >
  //         <LoginAuth animate={handleAnimation} />
  //       </animated.div>
  //     );
  //   } else {
  //     return (
  //       <animated.div
  //         // style={
  //         //   loginPage === true
  //         //     ? {
  //         //       x: animateData.x.to([0, 350], [0, -350]),
  //         //     }
  //         //     : {
  //         //       x: animateData.x.to([350, 0], [-350, 0]),
  //         //     }
  //         // }

  //         style={animateData1.opacity.to([100, 0], [1, 0])}
  //         className="col-9 col-sm-7 col-md-5 col-lg-3"
  //       >
  //         <PasswordResetAuth animate={handleAnimation2} />
  //       </animated.div>
  //     );
  //   }
  // };

  const page = () => {
      return (
        <>
        <animated.div
          style={animateData}
          className={loginPage ? "col-8 col-sm-10 col-md-8 col-lg-8" : "d-none col-8 col-sm-10 col-md-6 col-lg-7"}
        >
          <LoginAuth animate={handleAnimation} />
        </animated.div>

        <animated.div
          style={animateData1}
          className={!loginPage ? "col-8 col-sm-6 col-lg-7" : "d-none col-8 col-sm-6 col-lg-7"}
        >
          <PasswordResetAuth animate={handleAnimation2} />
        </animated.div>
        </>
      );
    } 
  return (
  //  <AdminLogin loginPage={loginPage} animateData={animateData}>
  //    {page()}
  //  </AdminLogin>

  <LoginScreen>
  {page()}
  </LoginScreen>
 
  )
}

export default AuthPages