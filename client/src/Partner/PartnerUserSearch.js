import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { BiHome } from "react-icons/bi";
import DeleteConfirmation from "./DeleteConfirmation";
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './PartnerJobAd.css';
import jwt_decode from 'jwt-decode';
function PartnerUserSearch() {

    const id = localStorage.getItem("user_id");
    const [msg, Setmsg] = useState("");
    const [JobNum, SetJobNum] = useState("");
    const [JobAds, SetJobAds] = useState([]);
    const [AlertMSG, SetAlertMSG] = useState("");
    const [AlertMSGStatus, SetAlertMSGStatus] = useState(false);

    const token = localStorage.getItem("token");
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

            Axios.post("http://localhost:3001/PartnerJobAdList", {
                user_id: id
            }).then((response) => {
                SetJobAds(response.data)
            })

            Axios.post("http://localhost:3001/CountPartnerJob", {
                user_id: id
            }).then((response) => {
                SetJobNum(response.data);
            });
        }

    }, [])

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
                            <NavDropdown.Item href="./EditPartnerProfile">Edit profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={Exit}>Log Out</NavDropdown.Item>
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



                {AlertMSGStatus && <Alert variant="success">{AlertMSG}</Alert>}

                <div>
                    {JobAds.map((Joblist) => {
                        const list = (

                            <>
                                <div className='JobAd_panel'>
                                    <br></br>
                                    <div className='JobAd_body'>
                                        <div className='JobAd_Nav_Body'>
                                            <div className="JobAd_Nav_Body_search" key={Joblist.id}>
                                                <Nav.Link href="" style={{ color: "black", width: "40%" }}> <h4>{Joblist.name}</h4></Nav.Link>        

                                                <button className='ADbutton_edit' style={{width : "20%", padding: 5}}><Link to={`../ReviewApplication/${Joblist.opp_id}`} state={Joblist.opp_id}>View applicants</Link></button>

                                              </div>

                                        </div>

                                    </div>
                                </div>

                            </>
                        )
                        return list
                    }
                    )}
                </div>


            </div>
        </div>


    );
}


export default PartnerUserSearch;
