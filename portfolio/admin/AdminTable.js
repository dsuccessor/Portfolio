import React, { useState } from "react";
const { useQuery } = require("@apollo/client");
import { GET_ADMIN } from "../../libs/query/adminQueries";
import Admin from "../Admin";
import NotifyToast from "../toast/NotifyToast";
// import { ToastContainer, toast } from "react-toastify";

function AdminTable({ choice }) {
  const { loading, error, data } = useQuery(GET_ADMIN);
  const [newAd, setNewAd] = useState();
  // const test = useQuery(GET_ADMIN);
  // console.log(test);
  const checkClicked = (click) => {
    console.log(click);
    setNewAd(click);
  };

  newAd && choice(newAd);

  if (loading) return <NotifyToast message={"Loading..."} />;
  // if (error)
  //   return toast.error(error.message, {
  //     position: toast.POSITION.TOP_LEFT,
  //   });

  // <NotifyToast message={error.message} />;
  if (!loading) {
    return (
      <div className="row px-3 overflow-scroll">
        <table className="table bg-white table-striped table-hover table-sm">
          <thead className="py-3">
            <tr className="bg-primary opacity-75 text-white py-3">
              {/* <th scope="col">Id</th> */}
              <th className="py-3" scope="col">Admin Id</th>
              <th className="py-3" scope="col">Surname</th>
              <th className="py-3" scope="col">Other Name</th>
              <th className="py-3" scope="col">Email Address</th>
              <th className="py-3" scope="col">Admin Level</th>
              <th className="py-3" scope="col">Created</th>
              <th className="py-3" scope="col">Updated</th>
              <th 
              // style={{ width: 10 }} 
              scope="col">
                Action
              </th>
            </tr>
          </thead>
          <div className="text-center text-danger fs-5 my-2">
            {error && "Unable to load record: " + error?.message}
          </div>
          <tbody className="">
            {data?.getAdminUsers.map((myAdmin) => {
              return (
                <Admin
                  listClick={checkClicked}
                  key={myAdmin.id}
                  data={myAdmin}
                />
              );
            })}
          </tbody>
        </table>
        {/* <ToastContainer /> */}
      </div>
    );
  }
}

export default AdminTable;
