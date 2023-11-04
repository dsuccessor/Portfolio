import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import passport from "../public/passport.jpeg";
import Link from "next/link";
import {
  MdHome,
  MdDescription,
  MdDashboard,
  MdContactMail,
  MdSettingsSuggest,
  MdLibraryBooks,
} from "react-icons/md";

import { RiAdminFill } from "react-icons/ri";

import { FcAssistant } from "react-icons/fc";

import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";

function Layout({ children, pageTitle, pageUrl }) {
  const router = useRouter();
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min");
  }, []);

  const activeUrl = usePathname();

  const sideBarMenus = [
    {
      url: "/home",
      icon: <MdHome />,
      title: "Dashboard",
    },
    {
      url: "/",
      icon: <MdDashboard />,
      title: "Portfolio",
    },
    {
      url: "/",
      icon: <MdDescription />,
      title: "Resumee",
    },
    {
      url: "/",
      icon: <MdContactMail />,
      title: "Cover Letter",
    },
    {
      url: "/portfolio/AdminReg",
      icon: <MdLibraryBooks />,
      title: "Curriculum Vitae",
    },
    {
      url: "/login",
      icon: <RiAdminFill />,
      title: "Admin Page",
    },
  ];

  const bottomNav = [
    {
      url: "/adminProfile",
      icon: <MdSettingsSuggest />,
      title: "Settings",
    },
    {
      url: "/login",
      icon: <AiOutlineLogout />,
      title: "Logout",
    },
  ];

  const logout = () => {
    sessionStorage?.removeItem("activeAdminUser")
    router?.push("/login")
  }

  return (
    <div className="vh-100 overflow-hidden">
      <div className="row">
        {/* Sidebar */}
        <div className="d-none d-xl-block col-2 bg-dark px-0 vh-100">
          <nav className="nav flex-column h-100">
            {/* SideBar Logo */}
            <div className="container h-100">
              <div className="row justify-content-center border-bottom border-1 border-grey">
                <div className="offset-1 col-6">
                  <a className="navbar-brand" href="#">
                    <Image
                      src={passport}
                      width={70}
                      alt="logo"
                      className="shadow-2 rounded-circle my-3"
                    />
                  </a>
                </div>
              </div>
              {/* </div> */}

              {/* Side Bar Navigations */}
              <div className="row">
                <div className="col-12 my-3">
                  {sideBarMenus?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        //className="nav-link text-light mb-3"
                        className={
                          activeUrl === item.url
                            ? "nav-link text-light mb-3 border-start border-3 border-light"
                            : "nav-link mb-3 text-white-50"
                        }
                        aria-current="page"
                        href={item.url}
                      >
                        <div className="row">
                          <div
                            style={{ fontSize: 12 }}
                            className="col-3 text-end mx-0 px-0"
                          >
                            {item.icon}
                          </div>
                          <div
                            style={{ fontSize: 12 }}
                            className="col-9 text-start mx-0"
                          >
                            {item.title}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Side Bar Bottom Navigations */}
              {activeUrl === pageUrl && <div className="row align-items-end">
                <div className="col-12" />
                <div className="col-12 pt-4 border-1 border-top border-light">
                  {bottomNav?.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className="nav-link text-white-50"
                        aria-current="page"
                        href={item.url}
                        onClick={item.title === "Logout" && logout}
                      >
                        <div className="row">
                          <div
                            style={{ fontSize: 12 }}
                            className="col-3 text-end mx-0 px-0"
                          >
                            {item.icon}
                          </div>
                          <div
                            style={{ fontSize: 12 }}
                            className="col-9 text-start mx-0"
                          >
                            {item.title}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>}

            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="col-12 col-xl-10 bg-tertiary px-0 vh-100 overflow-scroll">
          <nav className="navbar navbar-expand-lg border-bottom bg-white border-2 border-opacity-75 px-3">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                {pageTitle}
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6 offset-4" />
                    <div className="col-12 col-lg-1 my-2 my-lg-0 pt-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary position-relative"
                      >
                        Inbox
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          99+
                          <span className="visually-hidden">
                            unread messages
                          </span>
                        </span>
                      </button>
                    </div>
                    <div className="col-12 col-lg-1 my-2 my-lg-0">
                      <FcAssistant size={40} className="mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {children}
        </div>
        {/* <ToastContainer /> */}
      </div >
    </div >
  );
}

export default Layout;
