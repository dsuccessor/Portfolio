import React from "react";
import Layout from "./layout";
import passport from "../../public/passport.jpeg";
import Image from "next/image";
import { client, ApolloProvider } from "./client";
import AdminTable from "./AdminTable";
import Link from "next/link";

function Cv() {
  return (
    <Layout pageTitle={"Curriculum Vitae"}>
      <ApolloProvider client={client}>
        <div className="container-fluid">
          <div className="row my-3 ms-1 me-3 justify-content-between">
            <div className="col-9 port-shadow-8 bg-body py-3">
              <AdminTable />
            </div>
            <div className="col-2 port-shadow-8 bg-body h-25">
              <Image
                src={passport}
                className="my-3"
                height={200}
                width={170}
                quality={100}
                alt="logo"
              />
              <div className="row justify-content-center">
                <div className="col-11 my-3">
                  <Link
                    className="btn btn-primary ms-4 text-white py-2 "
                    href={"/portfolio/AdminReg"}
                  >
                    Create New
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ApolloProvider>
    </Layout>
  );
}

export default Cv;
