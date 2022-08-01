import Axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { BiHome } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import '../EditProfile.css'
import { Alert } from "react-bootstrap";

function EditPartnerProfile() {

    const id = localStorage.getItem("user_id");
    const [msg, Setmsg] = useState("");
    const nav = useNavigate();

    const Exit = () => {
        localStorage.clear()
        sessionStorage.clear()
        nav("../Login/PartnerLogin")
    }



    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isUpdatedBefore, setUpdateBefore] = useState(false);
    const [isUpdateSuccess, setUpdateSuccess] = useState(false);
    const [isUpdateFailed, setUpdateFailed] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");
    const [items, setItems] = useState([]);

    const [selectedFile, setSelectedFile] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const values = Object.fromEntries(data.entries());

        const config = {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        }
        Axios.post('http://localhost:3001/partners/save', values, config).then(
            (response) => {
                setUpdateBefore(true);
                setUpdateSuccess(true);
                console.log(response);
            }, (error) => {
                setUpdateBefore(true);
                setUpdateFailed(true);
                console.log(error);
            }
        )
    }

    useEffect(() => {
    
        Axios.post("http://localhost:3001/LoginCheckPartner", {
            user_id: id
        }).then((response) => {
                Setmsg(response.data);
        });

        Axios.get('http://localhost:3001/partners/' + localStorage.getItem("user_id")).then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                setItems(response.data);
            }, (error) => {
                console.log(error);
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, []);

    if (!isLoaded) {
        return (
            <div className="editProfile">
                <h1>Edit Profile</h1>
                <div>loading!</div>
            </div>
        );
    }
    else {
        if (isError)
            return (<div>error</div>);

        return (
            <form onSubmit={handleSubmit}>
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
                </div>
                <div className="editProfile" style={{marginTop : 20}}>
                    {isUpdatedBefore && isUpdateSuccess && <Alert variant="success">Profile Updated!</Alert>}
                    {isUpdatedBefore && isUpdateFailed && <Alert variant="danger">Profile failed to update</Alert>}
                    <h1>Edit Partner Profile</h1>
                    <div className="editProfileSection">
                        <h1>Basic Info</h1>
                        <div className="editProfileRow">
                            <label htmlFor="companyName">Company Name:</label>
                            <input type="text" id="companyName" name="companyName" defaultValue={items.company_name}></input>
                        </div>
                        <div className="editProfileRow">
                            <label htmlFor="companyIndustry">Company Industry:</label>
                            <input type="text" id="companyIndustry" name="companyIndustry" defaultValue={items.company_industry}></input>
                        </div>
                        <div className="editProfileRow">
                            <label htmlFor="uen">UEN:</label>
                            <input type="text" id="uen" name="uen" defaultValue={items.UEN}></input>
                        </div>
                    </div>
                    <div className="editProfileSection">
                        <h1>Company Overview</h1>
                        <label htmlFor="companyOverview" hidden>Company Overview:</label>
                        <textarea style={{ width: "100%" }} id="companyOverview" name="companyOverview" defaultValue={items.company_overview}></textarea>
                    </div>
                    <div className="editProfileSection">
                        <h1>Contact Info</h1>
                        <div className="editProfileRow">
                            <label htmlFor="contactName">Contact Name:</label>
                            <input type="text" id="contactName" name="contactName" defaultValue={items.contact_name}></input>
                        </div>
                        <div className="editProfileRow">
                            <label htmlFor="contactNumber">Contact Number:</label>
                            <input type="text" id="contactNumber" name="contactNumber" defaultValue={items.contact_number}></input>
                        </div>
                    </div>
                    <button type="submit">Save</button>
                </div>
            </form>
        );
    }
}

export default EditPartnerProfile;