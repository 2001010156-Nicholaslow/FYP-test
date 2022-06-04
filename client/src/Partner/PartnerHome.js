import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PartnerHome.css';
import { BiListUl, BiBarChartAlt2, BiSearchAlt, BiHide, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";


function PartnerHome() {


    return (
        <div className="RegisterHome">

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
                                                <p>Search user</p>
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

                                    <Link to="../Partner/Partner" style={{ padding: 10, }}>
                                        <button type="button">
                                            <div className="image_icon">
                                                <BiHide />
                                            </div>
                                            <p>Add-on?</p>
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