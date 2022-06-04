import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PartnerHome.css';
import { BiListUl, BiBarChartAlt2, BiSearchAlt} from "react-icons/bi";
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
                                <h3>Choose an option</h3>
                            </div>
                            <div>
                                <div className='pages_icons'>

                                    <div className='icon'>

                                        <Link to="./PartnerJobAd">
                                            <button type="button">
                                                <div className="image_icon">
                                                    <BiListUl />
                                                </div>
                                                <p>Job Ad</p>
                                            </button>
                                        </Link>


                                        <Link to="./PartnerUserSearch">
                                            <button type="button">
                                                <div className="image_icon">
                                                    <BiSearchAlt />
                                                </div>
                                                <p>Search user</p>
                                            </button>
                                        </Link>



                                        <Link to="./PartnerStats">
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PartnerHome;