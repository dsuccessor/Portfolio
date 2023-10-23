import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { client, ApolloProvider, getAuthToken } from "../../libs/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResumeeTable from "./ResumeeTable";
import ResumeeForm from "./ResumeeForm";

function CreateResumee() {
  if (typeof window !== 'undefined') {
    getAuthToken("loginToken")
    }
  const [imageClicked, setImageClicked] = useState();
  const [portType, setPortType] = useState();

  const listImage = (data) => {
    setImageClicked(data);
  };

  const portChoice = (data) => {
    setPortType(data);
  };

  return (
    <AdminDashboard pageTitle={"Admin | Portfolio Management"}>
      <ApolloProvider client={client}>
        <div className="container-fluid py-1 pe-4">
          <div className="row p-3 border-0 justify-content-center">
            <ResumeeForm imagePreview={imageClicked} getPort={portChoice} />
            <div className="row pt-3 border-0 justify-content-center">
              <div className="col-12 col-sm-6 col-md-12 bg-info">
                <div className="col-12 bg-light px-3">
                  <ResumeeTable
                    getImageClicked={listImage}
                    choosenPort={portType}
                  />
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </ApolloProvider>
    </AdminDashboard>
  );
}

export default CreateResumee;
