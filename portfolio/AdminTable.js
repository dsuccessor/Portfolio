import React, { useState } from "react";
import { useRouter } from "next/router";
const { useQuery, useLazyQuery, ApolloError } = require("@apollo/client");
import { GET_ADMIN, BULK_ADD_USERS } from "../libs/query/adminQueries";
import Admin from "./Admin";
import NotifyToast from "./toast/NotifyToast";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./security/PrivateRoute";
import { TfiReload } from "react-icons/tfi";


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
          'Syncronization completed. ' + data?.bulkAddUsers?.length + ' new record synched.',
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
          'Syncronization failed.\n' + error?.networkError?.result?.errors[0]?.message,
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

  // // Error for fetch query
  // if (getError?.networkError) {
  //   return toast.error(
  //     'Failed to fetch records, ' + getError?.networkError?.result?.errors[0]?.message,
  //     {
  //       position: toast.POSITION.TOP_LEFT,
  //     }
  //   );
  // }

  // if (getError?.graphQLErrors) {
  //   return toast('Failed to fetch records, ' + getError?.message,
  //     {
  //       position: toast.POSITION.TOP_LEFT,
  //     }

  //   )
  // }

  return (
    <PrivateRoute>
      <div className="container-fluid">
        <div className="row mx-1 mb-2">
          <div className="col-8 col-sm-8 col-md-10 pt-2">
            <h4 className="text-center text-secondary">
              Administrator&apos;s Account(s)
            </h4>
          </div>
          <div className="col-2 col-sm-4 col-md-2 align-middle">
            <button
              className="btn btn-outline-primary btn-lg float-end me-3 mb-2"
              onClick={syncAdminUsers}
            >
            <TfiReload className="mx-3"/>
              Sync
            </button>
          </div>
        </div>

        <div className="row px-3">
          <div className="rounded-5 bg-primary px-0 pb-0 pt-2">
            <table className="table rounded-0 table-striped table-hover table-sm m-0">
              <thead className="">
                <tr className="text-white">
                  <th className="py-c-4">
                    Admin Id
                  </th>
                  <th className="py-c-4">
                    Surname
                  </th>
                  <th className="py-c-4">
                    Other Name
                  </th>
                  <th className="py-c-4">
                    Email Address
                  </th>
                  <th className="py-c-4">
                    Admin Level
                  </th>
                  <th className="py-c-4">
                    Created
                  </th>
                  <th className="py-c-4">
                    Updated
                  </th>
                  <th className="py-c-4">
                    Action
                  </th>
                </tr>
              </thead>
             {
              getData?.getAdminUsers &&
              <tbody className="bg-light">
                {
                  getData?.getAdminUsers?.map((myAdmin) => {
                  return (
                    <Admin
                      listClick={checkClicked}
                      key={myAdmin.id}
                      data={myAdmin}
                    />
                  );
                })
              } 
              </tbody>
              }
            </table>

            {
              getError?.graphQLErrors && 
              <div className="col-12 py-3 bg-light border border-top-0 border border-primary">
              <h4 className="modal-title text-center text-danger fs-3"> {getError?.message} </h4>
              </div>
          }

          {
            getError?.networkError && 
            <div className="col-12 py-3 bg-light border border-top-0 border border-primary">
            <h4 className="modal-title text-center text-danger fs-3"> {getError?.networkError?.result?.errors[0]?.message} </h4>
            </div>
        }

          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}

export default AdminTable;
