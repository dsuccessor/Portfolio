import React from "react";
const { useMutation } = require("@apollo/client");
import { FaTrashAlt, FaGetPocket, FaGitAlt } from "react-icons/fa";
import { GET_ADMIN } from "./query/adminQueries";
import { DEL_ADMIN, UPDATE_ADMIN } from "./mutation/adminMutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToolTips from "./toast/ToolTips";


function Admin({ data, listClick }) {
  const [adminDelete] = useMutation(DEL_ADMIN, {
    variables: { id: data.id },
    refetchQueries: [{ query: GET_ADMIN }],
  });

  const deleteAdmin = () => {
    adminDelete()
      .then((data) => {
        toast.success(`Admin ${data?.surname} Record deleted succesfully`, {
          position: toast.POSITION.TOP_LEFT,
        });
      })
      .catch((error) => {
        toast.error(`Failed to delete Admin record`, {
          position: toast.POSITION.TOP_LEFT,
        });
      });
  };

  const showButtons = () => {
    return (
      <div>
        <button
          type="button"
          className="btn btn-danger btn-sm mx-2 px-2"
          onClick={deleteAdmin}
        >
          <FaTrashAlt />
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm mx-2 px-2"
          // onClick={UpdateAdmin}
        >
          <FaGetPocket />
        </button>
      </div>
    );
  };

  return (
    <tr
      onClick={() => {
        listClick(data?.passport);
        //console.log(data?.passport);
      }}
    >
      <td>{data.id}</td>
      <td>{data.adminId}</td>
      <td>{data.surname}</td>
      <td style={{ width: "400px" }}>{data.otherName}</td>
      <td>{data.email}</td>
      <td>{data.adminType}</td>
      <td style={{ width: "200px" }}>{data.createdAt}</td>
      <td style={{ width: "200px" }}>{data.updatedAt}</td>
      <td style={{ width: 10 }}>
      <ToolTips optionButtons={showButtons}/>
      </td>
    </tr>
  );
}

export default Admin;
