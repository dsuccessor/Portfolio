import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { client, ApolloProvider, getAuthToken } from "../../libs/client";
import PortfolioTable from "./PortfolioTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PortfolioForm from "./PortfolioForm";

function CreatePortfolio() {
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
            <PortfolioForm imagePreview={imageClicked} getPort={portChoice} />
            <div className="row pt-3 border-0 justify-content-center">
              <h4 className="text-center text-secondary m-0">
                {portType === undefined
                  ? "Language's Record(s)"
                  : `${portType}'s Record(s)`}
              </h4>
              <div className="col-12 col-sm-6 col-md-12 bg-info mt-2">
                <div className="col-12 bg-light mb-3 mb-sm-0 p-3">
                  <PortfolioTable
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

export default CreatePortfolio;
