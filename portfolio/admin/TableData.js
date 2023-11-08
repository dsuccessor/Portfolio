import React, { useEffect, useRef } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';
import { toTitleCase } from '@/libs/titleCase';
import Image from 'next/image';


function TableData({ tableData }) {
    const router = useRouter()

    const tableDetailModal = useRef()

    useEffect(() => {

        require("bootstrap/dist/js/bootstrap.min");
        tableDetailModal.current.click()
        console.log(tableDetailModal.current);

    }, []);

    const TableRecord = Object?.keys(tableData)
    const RecordValue = Object?.values(tableData)

    

    return (

        <div className="bg-primary">

            <button type="button" ref={tableDetailModal} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#tableDetailModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="tableDetailModal" tabindex="-1" aria-labelledby="tableDetailModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-1 border-secondary">
                        <div className="modal-header bg-primary">
                            <h1 className="modal-title fs-5 text-white" id="tableDetailModalLabel">{typeof RecordValue[2] === "string" ? `${toTitleCase(RecordValue[2])} Info` : `${RecordValue[2]} Info`}</h1>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div class="container text-center">
                                <div class="row row-cols-4 g-3 justify-content-between">
                                    {
                                        TableRecord.map((item, index) => {
                                            return (
                                                <div key={index} class="col text-start text-break border-1 border-bottom border-secondary mx-2 pb-3">
                                                    <label className="fw-bold text-primary py-3"> {toTitleCase(item)} </label>
                                                    <br />
                                                     {(item == "flyer" || item == "logo" || item == "passport") ? <Image className="mt-3" src={tableData[item]} width={50} height={50} quality={100}/> : <label> {tableData[item] } </label>}
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            </div>
                        </div>
                        <div className="text-center modal-footer text-black bg-primary">
                            <p className="text-center">Designed by <span className="fw-bold text-white">Classic</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default TableData