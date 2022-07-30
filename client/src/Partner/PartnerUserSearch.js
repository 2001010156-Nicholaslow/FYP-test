import React, { useState, useEffect } from 'react';
import { BiHome } from "react-icons/bi";
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
                        <NavDropdown.Item href="./EditPartnerProfile">Edit profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={Exit}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>
            <div>
                
               <p>his is the Partner Search page/ APPLication</p>

            </div>
        </div>
    );
}


export default PartnerUserSeach;