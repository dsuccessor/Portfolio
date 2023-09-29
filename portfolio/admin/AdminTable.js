import React, { useState } from "react";
const { useQuery } = require("@apollo/client");
import { GET_ADMIN } from "../../libs/query/adminQueries";
import Admin from "../Admin";
import NotifyToast from "../toast/NotifyToast";

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
  if (error) return <NotifyToast message={error.message} />;
  if (!loading && !error) {
    return (
      <div className="row px-3 overflow-scroll">
        <table className="table bg-white table-striped table-hover table-sm">
          <thead className="">
            <tr className="bg-primary opacity-75 text-white">
              <th scope="col">Id</th>
              <th scope="col">Admin Id</th>
              <th scope="col">Surname</th>
              <th scope="col">Other Name</th>
              <th scope="col">Email Address</th>
              <th scope="col">Admin Level</th>
              <th scope="col">Created</th>
              <th scope="col">Updated</th>
              <th style={{ width: 10 }} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data.getAdmins.map((myAdmin) => {
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
      </div>
    );
  }
}

export default AdminTable;
