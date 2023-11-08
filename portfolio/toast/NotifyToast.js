import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "react-bootstrap/Toast";

function NotifyToast({ message }) {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  return (
    <Toast show={showA} className="h-50 loader-position border-light port-shadow-8 pb-0 px-0">
      <div className="modal-header p-2 border-1 border-grey border-bottom">
        <h1 className="modal-title fs-6 text-primary" id="tableDetailModalLabel">Server Response</h1>
      </div>
      <Toast.Body className="text-primary bg-white text-center pb-0 px-0 mx-0 mb-0">
        <div className="container text-center">
          <div className="dh-100 row align-items-center">
            <div className="col-12 text-center">
              <h3 className="text-center fs-16 my-3">{message}</h3>
              <div className="align-self-center">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-secondary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center modal-footer text-black border-1 border-top border-grey py-2 mb-0 mx-0 px-3">
          <p className="text-center">Designed by <span className="fw-bold text-primary">Classic</span></p>
        </div>
      </Toast.Body>
    </Toast>
  );
}

export default NotifyToast;
