import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { BiHome } from "react-icons/bi";
import DeleteConfirmation from "./DeleteConfirmation";
import { Link } from 'react-router-dom'; 
import { Alert, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './PartnerJobAd.css';;
function PartnerJobAd() {

    const id = localStorage.getItem("user_id");
    const [msg, Setmsg] = useState("");
    const [JobNum, SetJobNum] = useState("");
    const [JobAds, SetJobAds] = useState([]);
    const [AlertMSG, SetAlertMSG] = useState("");
    const [AlertMSGStatus, SetAlertMSGStatus] = useState(false);

    const [deleteType, setdeleteType] = useState("");
    const [deleteID, setdeleteID] = useState("");
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);

    const showDeleteModal = (type,id) => {
        setdeleteType(type);
        setdeleteID(id);
        setDeleteMessage('Are you sure you want to delete "' + type + '"?')
        setDisplayConfirmationModal(true);
    }

    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
      };


    useEffect(() => {

        Axios.post("http://localhost:3001/PartnerJobAdList", {
            user_id: id
        }).then((response) => {
            SetJobAds(response.data)
        })
    }, [])

    useEffect(() => {
        function LoginCheckPartner() {
            Axios.post("http://localhost:3001/LoginCheckPartner", {
                user_id: id
            }).then((response) => {
                Setmsg(response.data);
            });
        }
        LoginCheckPartner()
    }, [])

    Axios.post("http://localhost:3001/CountPartnerJob", {
        user_id: id
    }).then((response) => {
        SetJobNum(response.data);
    });

    
    const deleteValue = (opp_id) => {
        
        Axios.delete(`http://localhost:3001/api/deleteListing/${opp_id}`).then((response) => {
            if (response.data.message) {
                Axios.post("http://localhost:3001/PartnerJobAdList", {
            user_id: id
        }).then((response) => {
            SetJobAds(response.data)
        })
                SetAlertMSG(response.data.message)
                SetAlertMSGStatus(true)
                setDeleteMessage('Successful!')
                setDisplayConfirmationModal(false);
                
            } else {
                SetAlertMSG("Delete Fail, Please Try Again.");
            }
            
        })
        

      };


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

               

               {AlertMSGStatus && <Alert variant="success">{AlertMSG}</Alert>}

                <div>
                    {JobAds.map((Joblist) => {
                        const list = (
                            
                            <>
                                <div className='JobAd_panel'>
                                    <br></br>
                                    <div className='JobAd_body'>
                                        <div className='JobAd_Nav'>
                                            <div className="Ad_detail" key={Joblist.id}>
                                                <Nav.Link href="" style={{ color: "black", width: "40%" }}> <h4>{Joblist.name}</h4></Nav.Link>
                                                <p className='Modified_AD_Text'>{Joblist.job_scope}</p>
                                                <p className='Modified_AD'>Last Modified: {(Joblist.created_at).replace('T', ', ').slice(0,(Joblist.created_at).length-7 )}</p>
                                               
                                                <button className='ADbutton_edit'><Link to="../Partner/PartnerFormEdit" state={Joblist.opp_id}>Edit</Link></button>
                                                
                                                <button className='ADbutton_delete' onClick={() => {showDeleteModal(Joblist.name,Joblist.opp_id)}}>Delete</button>

                                                <DeleteConfirmation showModal={displayConfirmationModal} hideModal={hideConfirmationModal} confirmModal={deleteValue} type={Joblist.name} id={Joblist.opp_id} message={deleteMessage}  />
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


export default PartnerJobAd;
