import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiHome } from "react-icons/bi";
import Axios from "axios";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import PartnerHome from "./PartnerHome";
import './Partner.css';
function Partner() {

    const id = localStorage.getItem("user_id");
    const [msg, Setmsg] = useState("");

    Axios.post("http://localhost:3001/LoginCheckPartner", {
        user_id: id
    }).then((response) => {
            Setmsg(response.data);
    });

    return (
        <div>
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
                        <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>

            <div className='Partner_Page'>

                <PartnerHome />


            </div>
        </div>
    );
}

export default Partner;