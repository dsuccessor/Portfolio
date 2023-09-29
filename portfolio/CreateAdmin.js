import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { useMutation } = require("@apollo/client");
import { ADD_ADMINS } from "@/libs/mutation/adminMutation";
import AdminTable from "./AdminTable";
import { GET_ADMIN } from "@/libs/query/adminQueries";
import imageAvatar from "@/public/imageAvatar.png";
import NotifyToast from "./toast/NotifyToast";

function CreateAdmin() {
  const [selectedAdmin, setSelectedAdmin] = useState();
  const [formData, setFormData] = useState({
    surname: "",
    otherName: "",
    email: "",
    adminType: "",
    passport: "",
    password: "",
  });

  const [submit, setSubmit] = useState(false);

  const { surname, otherName, email, passport, password, adminType } = formData;

  const [selectedPassport, setSelectedPassport] = useState();

  const convertPassport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      // Base64 Data URL 👇
      formData.passport = reader.result;
      setSelectedPassport(reader.result);
    });
    //formData.passport = URL?.createObjectURL(file);
    //setSelectedPassport(file);
  };

  const [AddAdmin, { loading }] = useMutation(ADD_ADMINS);
  if (loading) return <NotifyToast message={"Loading..."} />;
  const submitAdmin = (e) => {
    e.preventDefault();
    console.log(formData);

    const inputErr = Object.values(formData).includes("");
    if (inputErr) {
      toast.error(`No field should be left empty, Kindly fill all fields`, {
        position: toast.POSITION.TOP_LEFT,
      });
    } else {
      AddAdmin({
        variables: {
          surname: surname,
          otherName: otherName,
          email: email,
          passport: passport,
          password: password,
          adminType: adminType,
        },
        refetchQueries: [{ query: GET_ADMIN }],
      })
        .then((data) => {
          data &&
            toast.success("Registeration completed", {
              position: toast.POSITION.TOP_RIGHT,
            });
          //setFormData({});
        })
        .catch((error) => {
          error &&
            toast.error("Registeration failed, " + error.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          setFormData({});
        });
    }
  };

  const adminClick = (clicked) => {
    setSelectedAdmin(clicked);
  };

  return (
    <>
      <form
        className="form-control border-0 port-shadow-8 p-0"
        name="adminForm"
        onSubmit={submitAdmin}
      >
        <div className="row p-3 border-0 justify-content-center">
          <div className="col-12 col-sm-6 col-md-5">
            <div className="col-12 bg-light mb-3 mb-sm-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputSurname" className="form-label">
                  Surname:
                </label>
                <input
                  type="text"
                  className={
                    submit && formData?.surname === ""
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  id="exampleInputSurname"
                  onChange={(e) => {
                    formData.surname = e.target.value;
                    console.log(formData);
                  }}
                  aria-describedby="surnameHelp"
                />
                <div id="surnameHelp" className="form-text text-danger">
                  {submit && formData?.surname === ""
                    ? "Surname field cannot be left blank"
                    : ""}
                </div>
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputOtherName" className="form-label">
                  Other Name:
                </label>
                <input
                  type="text"
                  className={
                    submit && formData?.otherName === ""
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  id="exampleInputOtherName"
                  aria-describedby="otherNameHelp"
                  onChange={(e) => {
                    formData.otherName = e.target.value;
                  }}
                />
                <div id="otherNameHelp" className="form-text text-danger">
                  {submit && formData?.otherName === ""
                    ? "Other name field cannot be left blank"
                    : ""}
                </div>
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={
                    submit && formData?.email === ""
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    formData.email = e.target.value;
                  }}
                />
                <div id="emailHelp" className="form-text text-danger">
                  {submit && formData?.email === ""
                    ? "Email field cannot be left blank"
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-5">
            <div className="col-12 bg-light mb-3 mb-md-0 opacity-75 p-3">
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputadminType" className="form-label">
                  User Type
                </label>
                <select
                  className={
                    submit && formData?.adminType === ""
                      ? "form-select border-danger"
                      : "form-select"
                  }
                  defaultValue="Select user type"
                  aria-label="Default select example"
                  onChange={(e) => {
                    formData.adminType = e.target.value;
                  }}
                >
                  <option value="">Make a choice</option>
                  <option value="admin">Admin</option>
                  <option value="superAdmin">Super Admin</option>
                </select>
                <div id="adminTypeHelp" className="form-text text-danger">
                  {submit && formData?.adminType === ""
                    ? "User type field cannot be left blank"
                    : ""}
                </div>
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={
                    submit && formData?.password === ""
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  id="exampleInputPassword"
                  onChange={(e) => {
                    formData.password = e.target.value;
                  }}
                />
                <div id="passwordHelp" className="form-text text-danger">
                  {submit && formData?.password === ""
                    ? "Password field cannot be left blank"
                    : ""}
                </div>
              </div>
              <div className="mb-3 col-12">
                <label htmlFor="exampleInputPassport" className="form-label">
                  Passport
                </label>
                <input
                  type="file"
                  className={
                    submit && formData?.passport === ""
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  id="exampleInputPassport"
                  aria-describedby="passportHelp"
                  onChange={convertPassport}
                />
                <div id="passportHelp" className="form-text text-danger">
                  {submit && formData?.passport === ""
                    ? "Passport field cannot be left blank"
                    : ""}
                </div>
              </div>
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-md-2">
            <div className="col-12 p-3">
              <div className="text-center">
                {selectedPassport ? (
                  <Image
                    src={selectedPassport}
                    quality={100}
                    width={130}
                    height={150}
                    alt="passport"
                    className="rounded port-shadow-8"
                  />
                ) : selectedAdmin ? (
                  <Image
                    src={selectedAdmin}
                    quality={100}
                    width={130}
                    height={150}
                    alt="passport"
                    className="rounded port-shadow-8"
                  />
                ) : (
                  <Image
                    src={imageAvatar}
                    quality={100}
                    width={130}
                    height={150}
                    alt="passport"
                    className="rounded port-shadow-8"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="row p-3 border-0 justify-content-center">
        <h4 className="text-center text-secondary">
          Administrator&apos;s Account(s)
        </h4>
        <div className="col-12 col-sm-6 col-md-12 bg-primary">
          <div className="col-12 bg-light mb-3 mb-sm-0 p-2">
            <AdminTable choice={adminClick} />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default CreateAdmin;
