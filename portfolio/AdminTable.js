import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const { useQuery, useLazyQuery } = require("@apollo/client");
import { GET_ADMIN, BULK_ADD_USERS } from "../libs/query/adminQueries";
import Admin from "./Admin";
import NotifyToast from "./toast/NotifyToast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./security/PrivateRoute";

function AdminTable({ choice }) {

  // Page refresh logic
  const router = useRouter();
  const handleRefresh = () => {
    router.reload();
  };

  // Fetch Query
  const {
    data: getData,
    loading: getLoading,
    error: getError,
  } = useQuery(GET_ADMIN);

  const [newAd, setNewAd] = useState();
  newAd && choice(newAd);

  // Syncronization query
  const [bulkAdmin, { loading }] = useLazyQuery(BULK_ADD_USERS);

  // Syncronization query function
  const syncAdminUsers = () => {
    bulkAdmin().then(({ data, error }) => {
      if (data && data != null) {
        toast.success(
          `Syncronization completed. ${data?.bulkAddUsers?.length} new record synched.`,
          {
            position: toast.POSITION.RIGHT,
          }
        );

        setTimeout(() => {
          handleRefresh();
        }, 5000);
      }

      if (error?.message != undefined) {
        toast.error(
          `Syncronization failed.\n ${error?.networkError?.result?.errors[0]?.message}`,
          {
            position: toast.POSITION.TOP_LEFT,
          }
        );
      }
    });
  };

  const checkClicked = (click) => {
    console.log(click);
    setNewAd(click);
  };

  // Fetch query loader
  if (getLoading) return <NotifyToast message={"Loading..."} />;

  // Syncronization query loader
  if (loading) return <NotifyToast message={"Syncronizaton in progress..."} />;

  // Error for fetch query
  if (getError)
    return toast.error(
      `Failed to fetch records, ${getError?.networkError?.result?.errors[0]?.message}`,
      {
        position: toast.POSITION.TOP_LEFT,
      }
    );

  return (
    <PrivateRoute>
    <div className="container-fluid">
      <div className="row mx-1 mb-2">
        <div className="col-8 col-sm-8 col-md-10 ">
          <h4 className="text-center text-secondary">
            Administrator&apos;s Account(s)
          </h4>
        </div>
        <div className="col-2 col-sm-4 col-md-2">
          <button
            className="btn btn-outline-primary float-end"
            onClick={syncAdminUsers}
          >
            Sync
          </button>
        </div>
      </div>

      <div className="text-center text-danger fs-5 my-2">
        {getError &&
          "Unable to load record: " +
            getError?.networkError?.result?.errors[0]?.message}
      </div>

      <div className="row px-3 overflow-scroll">
        <table className="table bg-white table-striped table-hover table-sm">
          <thead className="py-3">
            <tr className="bg-primary opacity-75 text-white py-3">
              {/* <th scope="col">Id</th> */}
              <th className="py-3 ps-3" scope="col">
                Admin Id
              </th>
              <th className="py-3 ps-3" scope="col">
                Surname
              </th>
              <th className="py-3 ps-3" scope="col">
                Other Name
              </th>
              <th className="py-3 ps-3" scope="col">
                Email Address
              </th>
              <th className="py-3 ps-3" scope="col">
                Admin Level
              </th>
              <th className="py-3 ps-3" scope="col">
                Created
              </th>
              <th className="py-3 ps-3" scope="col">
                Updated
              </th>
              <th className="py-3 ps-3" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {/* {
              !myData || myData == null
              ?  */}
            {getData?.getAdminUsers?.map((myAdmin) => {
              return (
                <Admin
                  listClick={checkClicked}
                  key={myAdmin.id}
                  data={myAdmin}
                />
              );
            })}
            {/* 
              : data?.getAdminUsers
                  ?.concat(myData?.bulkAddUsers)
                  .map((myAdmin) => {
                    return (
                      <Admin
                        listClick={checkClicked}
                        key={myAdmin.id}
                        data={myAdmin}
                      />
                    );
                  })}  */}
          </tbody>
        </table>
      </div>
    </div>
    </PrivateRoute>
  );
}

export default AdminTable;
