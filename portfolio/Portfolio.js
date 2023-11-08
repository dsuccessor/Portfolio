import React, { useState } from "react";
const { useMutation } = require("@apollo/client");
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toTitleCase } from "@/libs/titleCase";
import Link from "next/link"
import TableData from "./admin/TableData";
import NotifyToast from "./toast/NotifyToast";

function Portfolio({ item, activeTable, choosenPort, getQuery, delQuery, getImageClicked }) {

    const [getTableRecord, setGetTableRecord] = useState();
    const [tableRecordModal, setTableRecordModal] = useState(false);
    const [DelLanguageById] = useMutation(delQuery);

    const deletePort = async (delid) => {
        DelLanguageById({
            variables: { id: delid },
            refetchQueries: [{ query: getQuery }],
        })
            .then((data, loading) => {
                loading && <NotifyToast message={"Delete Processing..."} />;
                data &&
                    toast.success(
                        `${delid} Record deleted succesfully from ${activeTable}`,
                        {
                            position: toast.POSITION.TOP_LEFT,
                        }
                    );
            })
            .catch((error) => {
                error &&
                    toast.error(
                        `Failed to delete ${activeTable} record DUE TO ${error}`,
                        {
                            position: toast.POSITION.TOP_LEFT,
                        }
                    );
            });
    };

    const showActions = (idTODel) => {
        return (
            <div className="py-c-4">
                <Link href="" className="text-danger text-decoration-none me-4" onClick={() => deletePort(idTODel)}>Delete</Link>
                <Link href="" className="text-primary text-decoration-none me-4">Update</Link>
            </div>
        );
    };

    if (tableRecordModal === true) return <TableData tableData={getTableRecord} />

    return (
        <>

            {
                choosenPort === "project"
                    ? <tr key={item?.id} onClick={() => {
                        setGetTableRecord(item)
                        setTableRecordModal(true)
                    }}>

                        <td className="py-c-4" style={{ width: "270px" }}>
                            {item?.id}
                        </td>

                        <td className="py-c-4 text-primary" onClick={() => getImageClicked(item?.flyer)}>
                            <Link href="" className="text-decoration-none">
                                {toTitleCase(item?.name)}
                            </Link>
                        </td>

                        <td className="py-c-4">
                            {item?.description?.length}
                        </td>

                        <td className="py-c-4">
                            {toTitleCase(item?.technologies?.toString())}
                        </td>

                        <td className="py-c-4">{item?.createdAt}</td>

                        <td className="py-c-4">{item?.updatedAt}</td>

                        <td className="pt-4">
                            {showActions(item?.id)}
                        </td>

                    </tr>
                    : choosenPort === "skill"
                        ? <tr
                            key={item?.id}
                            onClick={() => {
                                setGetTableRecord(item)
                                setTableRecordModal(true)
                            }}
                        >
                            <td className="py-c-4 text-primary" style={{ width: "270px" }} onClick={() => {
                                //listClick(item?.logo);
                                getImageClicked(item?.logo);
                            }}>
                                <Link href="" className="text-decoration-none">{item?.id}</Link>
                            </td>
                            <td className="py-c-4">{toTitleCase(item?.name)}</td>
                            <td className="py-c-4">{item?.description?.length}</td>
                            <td className="py-c-4">{toTitleCase(item?.level)}</td>
                            <td className="py-c-4">{item?.createdAt}</td>
                            <td className="py-c-4">{item?.updatedAt}</td>
                            <td style={{ width: 10 }}>
                                {showActions(item?.id)}
                            </td>
                        </tr>
                        : choosenPort === "media"
                            ? <tr
                                        key={item?.id}
                                        onClick={() => {
                                            setGetTableRecord(item)
                                            setTableRecordModal(true)
                                        }}>

                                        <td className="py-c-4 text-primary" style={{ width: "270px" }} onClick={() => getImageClicked(item?.logo)}>
                                            <Link href="" className="text-decoration-none">{item?.id}</Link>
                                        </td>

                                        <td className="py-c-4"> {toTitleCase(item?.name)} </td>
                                        <td className="py-c-4"> {toTitleCase(item?.handle)} </td>
                                        <td className="py-c-4">{toTitleCase(item?.link)}</td>
                                        <td className="py-c-4">{item?.createdAt}</td>
                                        <td className="py-c-4">{item?.updatedAt}</td>
                                        <td style={{ width: 10 }}>
                                            {showActions(item?.id)}
                                        </td>
                                    </tr>
                            : <tr
                                        key={item?.id}
                                        onClick={() => {
                                            setGetTableRecord(item)
                                            setTableRecordModal(true)
                                        }}
                                    >
                                        <td className="py-c-4 text-primary" style={{ width: "270px" }} onClick={() => {
                                            //listClick(item?.logo);
                                            getImageClicked(item?.logo);
                                        }}>
                                            <Link href="" className="text-decoration-none">{item?.id}</Link>
                                        </td>
                                        <td className="py-c-4">{toTitleCase(item?.name)}</td>
                                        <td className="py-c-4">{item?.description?.length}</td>
                                        <td className="py-c-4">{toTitleCase(item?.level)}</td>
                                        <td className="py-c-4">{item?.createdAt}</td>
                                        <td className="py-c-4">{item?.updatedAt}</td>
                                        <td style={{ width: 10 }}>
                                            {showActions(item?.id)}
                                        </td>
                                    </tr>
            }
        </>


    )
}

export default Portfolio