import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PartnerHome.css';
import { BiListUl, BiBarChartAlt2, BiSearchAlt, BiUser } from "react-icons/bi";
import { IoWarning } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { Alert } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";


function PartnerHome() {

    const Uid = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const [AlertMSG, SetAlertMSG] = useState("");
    const [AlertMSGStatus, SetAlertMSGStatus] = useState(false);
    const nav = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        localStorage.clear()
    }

    useEffect(() => {
        if (Uid == "" || token == "" || Uid == undefined || token == undefined) {
            nav("../Login/PartnerLogin")
            window.location.reload();
        } else {
            Axios.post("http://localhost:3001/CheckPartnerCompleted", {
                user_id: Uid
            }).then((response) => {
                if (response.data.message) {
                    SetAlertMSG(response.data.message)
                    SetAlertMSGStatus(true)
                }
            })
        }
    }, [])


    return (
        <div className="RegisterHome">

            {AlertMSGStatus && <Alert variant="warning" >
                <b><IoWarning />Warning!: Profile Verification</b>
                <br></br>
                <p className="text_alertmsg">{AlertMSG} To complete your profile <a href='../Partner/PartnerProfile'>Click Here</a></p></Alert>}


            <div className='panel'>
                <div className='panel-body'>
                    <h1>Welcome to the Recruitment Centre</h1>
                    <div className='stuff_todo'>
                        <div className='row_item'>
                            <div class="col-sm-12 col-md-6 col-lg-5">
                                <h3>Select an option</h3>
                            </div>
                            <div className='pages_options'>
                                <div className='pages_icons'>

                                    <div className='icon'>


                                        <Link to="../Partner/PartnerJobAd" style={{ padding: 10 }}>
                                            <button type="button">
                                                <div className="image_icon">
                                                    <BiListUl />
                                                </div>
                                                <p>Job Ad</p>
                                            </button>
                                        </Link>


                                        <Link to="../Partner/PartnerUserSearch" style={{ padding: 10 }}>
                                            <button type="button">
                                                <div className="image_icon">
                                                    <BiSearchAlt />
                                                </div>
                                                <p>Applicants</p>
                                            </button>
                                        </Link>



                                        <Link to="../Partner/PartnerStats" style={{ padding: 10 }}>
                                            <button type="button">
                                                <div className="image_icon">
                                                    <BiBarChartAlt2 />
                                                </div>
                                                <p>Statics</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            <div className='Profile_Edit'>
                                <div className='icon'>
                                    <Link to="../Partner/PartnerProfile" style={{ padding: 10, }}>
                                        <button type="button">
                                            <div className="image_icon">
                                                <BiUser />
                                            </div>
                                            <p>Profile</p>
                                        </button>
                                    </Link>

                                    <Link to="../" style={{ padding: 10, }}>
                                        <button type="button" onClick={logout}>
                                            <div className="image_icon">
                                                <ImExit />
                                            </div>
                                            <p>Log out</p>
                                        </button>
                                    </Link>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartnerHome;