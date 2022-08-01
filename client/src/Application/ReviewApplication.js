import Axios from "axios";
import React from "react";
import MaterialTable from "material-table";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react"
import { BiHome } from "react-icons/bi";
import { Alert, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';

import './Application.css'

function ReviewApplication() {

    const { oppId } = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);

    const id = localStorage.getItem("user_id");
    const [msg, Setmsg] = useState("");
    const token = localStorage.getItem("token");

    const nav = useNavigate();

    const Exit = () => {
        localStorage.clear()
        sessionStorage.clear()
        nav("../Login/PartnerLogin")
    }

    useEffect(() => {
        if (id == "" || token == "" || id == undefined || token == undefined) {
            nav("../Login/PartnerLogin")
            window.location.reload();
        } else {

            var decoded = jwt_decode(token);

            if (decoded.id == id) {
                Axios.post("http://localhost:3001/LoginCheckPartner", {
                    user_id: id
                }).then((response) => {
                    Setmsg(response.data);
                });
            } else {
                localStorage.clear()
                sessionStorage.clear()
                nav("../Login/PartnerLogin")
            }
        }
        Axios.get('http://localhost:3001/opportunity/' + oppId + '/applications').then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                setData(response.data)
            }, (error) => {
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
        Axios.post('http://localhost:3001/application/' + rowData.id_application + '/status', { status: status }).then(
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

    if (oppId == null) {
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

    if (!isLoaded) {
        return (<div>loading</div>);
    }
    else {
        if (!isError) {
            console.log(data)
            return (
                <div>

                    <div>
                        <Navbar bg="dark" variant="dark">
                            <Nav.Link href="../Partner/Partner">
                                <div className="image_icon_nav">
                                    <BiHome />
                                </div>
                            </Nav.Link>
                            <Nav className="me-auto">
                                <Nav.Link href="../Partner/PartnerJobAd">Job Ad</Nav.Link>
                                <Nav.Link href="../Partner/PartnerUserSearch">Search user</Nav.Link>
                                <Nav.Link href="../Partner/PartnerStats">Statics</Nav.Link>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <NavDropdown title={"Sign in as : " + msg} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="../Partner/EditPartnerProfile">Edit profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={Exit}>Log Out</NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>

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
                </div>

            )
        }
    }
}

export default ReviewApplication;