import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import { client, ApolloProvider, getAuthToken } from "../libs/client";
import CreateAdmin from "./CreateAdmin";
import { usePathname } from "next/navigation";

function AdminReg() {
  if (typeof window !== 'undefined') {
  getAuthToken("loginToken")
  }

  const activeUrl = usePathname();

  return (
    <AdminDashboard pageTitle={"Admin Registeration"} pageUrl={activeUrl}>
      <ApolloProvider client={client}>
        <div className="container-fluid py-3 pe-4">
          <CreateAdmin />
        </div>
      </ApolloProvider>
    </AdminDashboard>
  );
}

export default AdminReg;
