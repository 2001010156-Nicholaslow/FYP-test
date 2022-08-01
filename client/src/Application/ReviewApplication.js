import Axios from "axios";
import React from "react";
import MaterialTable from "material-table";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react"

import './Application.css'

function ReviewApplication(){

    const { oppId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:3001/opportunity/' + oppId + '/applications').then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                setData(response.data)
            }, (error) =>{
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, []);

    const downloadResume = (application_id) => {
        Axios.get('http://localhost:3001/application/' + application_id + '/download').then(
            (response) => {
                var f = new File([response.data], String(application_id) + ".pdf", {
                    type: "application/pdf"
                })

                var link = document.createElement("a");
                link.download = f.name;
                link.href = URL.createObjectURL(f);
                link.click();

            }, (error) => {
                console.log(error);
            }
        );
    };

    const changeStatus = (rowData, status) => {
        console.log(rowData.id_application);
        Axios.post('http://localhost:3001/application/' + rowData.id_application + '/status', {status: status}).then(
            (response) => {
                console.log(response);
                rowData.status = status;
                window.location.reload();
            }, (error) => {
                console.log(error);
                window.alert("something went wrong");
            }
        );
    };

    if(oppId == null)
    {
        throw new Error("No opportunity ID provided");
    }

    const [columns, setColumns] = useState([
        {
            title: "Application ID",
            field: "id_application",
            filtering: false,
        },
        {
            title: "Full Name",
            field: "full_name",
            filtering: true,
            render: (rowData) => {
                return (
                    <Link to={"/profile/" + rowData.user_id}>{rowData.full_name}</Link>
                );
            },
        },
        {
            title: "Status",
            field: "status",
            filtering: true,
        },
        {
            title: "Date Applied",
            field: "applied_date",
            filtering: false,
        },
        {
            title: "Resume",
            field: "id_application",
            filtering: false,
            editable: "never",
    
            render: (rowData) => {
                return (
                    <button
                        onClick={() => {
                        downloadResume(rowData.id_application);
                        }}
                    >
                    Download
                    </button>
                );
            },
        },
        {
            title: "",
            field: "id_application",
            filtering: false,
            editable: "never",
    
            render: (rowData) => {
                return (
                    <button
                        onClick={() => {
                        changeStatus(rowData, "Pending");
                        }}
                    >
                    Pending
                    </button>
                );
            },
        },
        {
            title: "",
            field: "id_application",
            filtering: false,
            editable: "never",
    
            render: (rowData) => {
                return (
                    <button
                        onClick={() => {
                        changeStatus(rowData, "Accept");
                        }}
                    >
                    Accept
                    </button>
                );
            },
        },
        {
            title: "",
            field: "id_application",
            filtering: false,
            editable: "never",
    
            render: (rowData) => {
                return (
                    <button
                        onClick={() => {
                        changeStatus(rowData, "Rejected");
                        }}
                    >
                    Reject
                    </button>
                );
            },
        },
      ]);

    if(!isLoaded)
    {
        return(<div>loading</div>);
    }
    else
    {
        if(!isError)
        {
            console.log(data)
            return(
                <div>
                <MaterialTable
                    title=" Manage Applicants"
                    columns={columns}
                    data={data}
                    options={{
                        filtering: true,
                    }}
                />

                </div>
            )
        }
    }
}

export default ReviewApplication;