import React from "react";
const { useMutation } = require("@apollo/client");
import { FaTrashAlt, FaGetPocket, FaGitAlt } from "react-icons/fa";
import { GET_ADMIN } from "../libs/query/adminQueries";
import { DEL_ADMIN, UPDATE_ADMIN } from "../libs/mutation/adminMutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToolTips from "./toast/ToolTips";
import { toTitleCase } from "@/libs/titleCase";

function Admin({ data, listClick }) {
  const [adminDelete] = useMutation(DEL_ADMIN, {
    variables: { id: data.id },
    refetchQueries: [{ query: GET_ADMIN }],
  });

  const deleteAdmin = () => {
    adminDelete()
      .then(({ data }) => {
        toast.success(
          `Admin ${data?.deleteAdminById?.email} Record deleted succesfully`,
          {
            position: toast.POSITION.TOP_LEFT,
          }
        );
      })
      .catch((error) => {
        error &&
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
      <td className="py-2 ps-3">{data.userId}</td>
      <td className="py-2 ps-3">{toTitleCase(data.surname)}</td>
      <td className="py-2 ps-3">{toTitleCase(data.otherName)}</td>
      <td className="py-2 ps-3">{toTitleCase(data.email)}</td>
      <td className="py-2 ps-3">{toTitleCase(data.role)}</td>
      <td className="py-2 ps-3">{data.createdAt}</td>
      <td className="py-2 ps-3">{data.updatedAt}</td>
      <td className="pb-2">
        <ToolTips optionButtons={showButtons} />
      </td>
    </tr>
  );
}

export default Admin;
