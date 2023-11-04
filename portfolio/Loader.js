import React, { useEffect, useRef, useState } from 'react'

function Loader() {
  const loaderModalBtn = useRef()

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min");
    loaderModalBtn.current.click()
    console.log(loaderModalBtn.current);
  }, []);
  
  return (
    <div>
      <button type="button" ref={loaderModalBtn} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#loaderModal">
        Load Loader
      </button>

      <div className="modal modal-sm fade" id="loaderModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="loaderModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
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
    </div>
  );
}

export default Loader;
