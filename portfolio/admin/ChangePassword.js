import { UPDATE_PASSWORD } from '@/libs/mutation/adminMutation';
import { useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react'
import NotifyToast from '../toast/NotifyToast';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';

function ChangePassword({ userEmail }) {

  const router = useRouter()

  const [userPassword, setUserPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const [UpdatePassword, { data, loading, error }] = useMutation(UPDATE_PASSWORD, { variables: { email: userEmail, password: userPassword, newPassword: newPassword } })

  const cpModalBtn = useRef()

  useEffect(() => {

    require("bootstrap/dist/js/bootstrap.min");
    cpModalBtn.current.click()
    console.log(cpModalBtn.current);
    
  }, []);

  const updatePassword = (e) => {
    e.preventDefault();
    UpdatePassword({variables: {email: userEmail, password: userPassword, newPassword: newPassword}})
    .then(({data})=>{
      if (data){
      toast.success('Password Updated', {
        position: toast.POSITION.TOP_RIGHT,
    });
    window.location.replace('/login');
  }
    })
    .catch(error=>{
      if (error){
      toast.info('Password Update Failed, ' + error, {
        position: toast.POSITION.TOP_CENTER,
    });
  }
    })
  }

  if (loading === true)
        return <NotifyToast message={"Processing password update..."} />;

  return (

    <div className="bg-primary">

      <button type="button" ref={cpModalBtn} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#cpModal">
        Launch demo modal
      </button>

      <div className="modal modal-sm fade" id="cpModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="cpModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-primary" id="cpModalLabel">Password Update!</h1>
            </div>
            <div className="modal-body">

              <form encType="" method="POST" name="passUpdateForm" onSubmit={(e) => updatePassword(e)}>
                <div className="mb-3">
                  <label for="inputCurrPass" className="form-label">Current Password</label>
                  <input name="currPass" type="password" onChange={(e)=>setUserPassword(e?.target?.value)} className="form-control" id="inputCurrPass" aria-describedby="currPassHelp" />
                </div>
                <div className="mb-3">
                  <label for="inputNewPass" className="form-label">Password</label>
                  <input name="newPass" type="password" onChange={(e)=>setNewPassword(e?.target?.value)} className="form-control" id="inputNewPass" />
                </div>
                <button type="submit" className="btn btn-primary me-4">Submit</button>
                <button type="reset" className="btn btn-danger me-4">Clear</button>
              </form>
            </div>
            <div className="text-center modal-footer text-black">
              <p className="text-center">Designed by <span className="fw-bold text-primary">Classic</span></p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default ChangePassword