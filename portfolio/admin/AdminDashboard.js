import React, { useState, useEffect } from "react";
import Layout from "../layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { client, ApolloProvider } from "@/libs/client";

function AdminDashboard({children, pageTitle, pageUrl}) {

  const activeUrl = usePathname();

  const adminLinks = [
    {
      id: 1,
      name: "Admin",
      link: "/adminProfile",
    },
    {
      id: 2,
      name: "Portfolio",
      link: "/portfolioAdmin",
    },
    {
      id: 3,
      name: "Resumee",
      link: "/resumeeAdmin",
    },
    {
      id: 4,
      name: "Cv",
      link: "/",
    },
    {
      id: 5,
      name: "Other",
      link: "/",
    },
  ];

  return (
    <Layout pageTitle={"Administrative Dashboard"} pageUrl={pageUrl}>
      <ApolloProvider client={client}>
        <div className="container-fluid">

          {/* Second Row */}
          <div className="row gx-3 px-2 mt-3">
            {adminLinks?.map((admin, index) => {
              return (
                <div key={index} className="col-12 col-md-6 col-lg mb-3">
                  <div
                    className={
                      activeUrl === "/resumeeAdmin" && activeUrl === admin?.link
                      ? "bg-info text-white border-0 rounded-3 port-shadow-8" 
                      : activeUrl === admin?.link
                        ? "bg-primary text-white border-0 rounded-3 port-shadow-8"
                        : "bg-white text-secondary border-0 rounded-3 port-shadow-8"
                    }
                  >
                    <Link
                      className="col p-3 nav-link"
                      href={admin?.link}
                    >
                      {admin?.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row gx-3 px-2 mt-1">
          <h4 className="card-title fs-14 text-secondary text-center">{pageTitle}</h4>
          {children}
          </div>
        </div>
      </ApolloProvider>
    </Layout>
  );
}

export default AdminDashboard;
