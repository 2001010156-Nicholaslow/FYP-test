import React, { useState } from 'react';
import Axios from "axios";
import { BiHome } from "react-icons/bi";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './PartnerJobAd.css';
function PartnerJobAd() {

    const id = localStorage.getItem("user_id");
    const [msg, Setmsg] = useState("");
    const [JobNum, SetJobNum] = useState("");

    Axios.post("http://localhost:3001/LoginCheckPartner", {
        user_id: id
    }).then((response) => {
            Setmsg(response.data);
    });

    Axios.post("http://localhost:3001/CountPartnerJob", {
        user_id: id
    }).then((response) => {
        SetJobNum(response.data);
    });


    return (
        <div>
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
            </div>



            <div className='JobAd'>
                <div className='JobAd_panel'>
                    <br></br>
                    <div className='JobAd_body'>
                        <Navbar className='JobAd_Nav'>
                            <Navbar.Brand style={{ color: "white" }}>Job Listings</Navbar.Brand>

                            <Navbar.Collapse className="justify-content-end">
                                <button><Nav.Link href="./PartnerJobAd" style={{ color: "black" }}>Jobs listed ({JobNum})</Nav.Link></button>
                                <button className='button_create'><Nav.Link href="./PartnerForm" style={{ color: "white" }}>Create Job Ad</Nav.Link></button>
                            </Navbar.Collapse>
                        </Navbar>

                    </div>
                </div>

                <div className='JobAd_panel'>
                    <br></br>
                    <div className='JobAd_body'>
                        <div className='JobAd_Nav'>
                            <div className="Ad_detail">
                                <Nav.Link href="#Hello" style={{ color: "black", width: "40%" }}> <h4>Blue T-Shirt</h4></Nav.Link>
                                <p className='Modified_AD'>Last Modified: 100 seconds ago.</p>
                                <button className='ADbutton_edit'>Edit</button>
                                <button className='ADbutton_delete'>Delete</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>


    );
}


export default PartnerJobAd;