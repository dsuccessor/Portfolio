import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import { client, ApolloProvider, getAuthToken } from "../libs/client";
import CreateAdmin from "./CreateAdmin";

function AdminReg() {
  if (typeof window !== 'undefined') {
  getAuthToken("loginToken")
  }
  return (
    <AdminDashboard pageTitle={"Admin Registeration"}>
      <ApolloProvider client={client}>
        <div className="container-fluid py-3 pe-4">
          <CreateAdmin />
        </div>
      </ApolloProvider>
    </AdminDashboard>
  );
}

export default AdminReg;
