import React, { useState, useEffect } from 'react';
import { BiHome } from "react-icons/bi";
import MUIDataTable from "mui-datatables";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Partner.css';
import jwt_decode from 'jwt-decode';


function PartnerUserSeach() {

    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const [msg, Setmsg] = useState("");
    const [AllowUser, SetAllowUser] = useState(false);

    const nav = useNavigate();

    const Exit = () => {
        localStorage.clear()
        sessionStorage.clear()
        nav("../Login/PartnerLogin")
    }

    useEffect(() => {

        if (id == "" || token == "" || id == undefined || token == undefined) {
            nav("../Login/PartnerLogin")
        } else {
            var decoded = jwt_decode(token);

            if (decoded.id == id) {
                SetAllowUser(true)
                Axios.post("http://localhost:3001/LoginCheckPartner", {
                    user_id: id
                }).then((response) => {
                    Setmsg(response.data);
                });
            } else {
                SetAllowUser(false)
                localStorage.clear()
                sessionStorage.clear()
                nav("../Login/PartnerLogin")
            }
        }
    }, [])



    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "company",
            label: "Company",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "job_name",
            label: "Job Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "date",
            label: "Date Applied",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "actions",
            label: "Actions",
            options: {
                filter: false,
                sort: false,
            }
        },
    ];

    const data = [
        { name: "Joe James", company: "Test Corp", job_name: "Intern", status: "Pending", date: "1/7/2022" },
        { name: "John Walsh", company: "Test Corp", job_name: "Linux Admin", status: "Pending", date: "1/7/2022" },
        { name: "Bob Herm", company: "Test Corp", job_name: "Linux Admin", status: "Shortlisted", date: "1/7/2022" },
        { name: "James Houston", company: "Test Corp", job_name: "Linux Admin", status: "Rejected", date: "22/7/2022" },
    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <div>
            {AllowUser}
            <Navbar bg="dark" variant="dark">
                <Nav.Link href="./Partner">
                    <div className="image_icon_nav">
                        <BiHome />
                    </div>
                </Nav.Link>
                <Nav className="me-auto">
                    <Nav.Link href="./PartnerJobAd">Job Ad</Nav.Link>
                    <Nav.Link href="./PartnerUserSearch">Search user</Nav.Link>
                    <Nav.Link href="./PartnerStats">Statics</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title={"Sign in as : " + msg} id="basic-nav-dropdown">
                        <NavDropdown.Item href="./PartnerProfile">Edit profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={Exit}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
            <div>
                
                <MUIDataTable
                    title={<h2>Application List</h2>}
                    data={data}
                    columns={columns}
                    options={options}
                />

            </div>
        </div>
    );
}


export default PartnerUserSeach;