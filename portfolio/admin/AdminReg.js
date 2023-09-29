import React, { useState } from "react";
import Layout from "../layout";
import { client, ApolloProvider } from "../../libs/client";
import CreateAdmin from "./CreateAdmin";

function AdminReg() {
  return (
    <Layout pageTitle={"Admin Registeration"}>
      <ApolloProvider client={client}>
        <div className="container-fluid py-3 pe-4">
          <CreateAdmin />
        </div>
      </ApolloProvider>
    </Layout>
  );
}

export default AdminReg;
