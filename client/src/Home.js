import React from "react";
import './Home.css';
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="Home_page">
            <div>
                <div className="search_banner">
                    <h1 className="home_title_text">Find your dream jobs with us!</h1>
                    <p className="home_title_text">Search by name or skills</p>
                    <div className="search_bar">
                        <input type="text" placeholder="Search Job by Title or Keyword" className="text_search" />
                        <button type="button" className="button_search_home">
                            <div className="image_icon_home">
                                <BiSearchAlt />
                            </div>
                        </button>
                    </div>
                </div>

            </div>

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br><br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br><br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br><br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br><br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br><br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <footer className="home_footer">
                <div className="home_footer_container">
                    <div className="home_footer_row">

                        <div class="grid-container_home">

                            <div class="grid-item_home_empty"></div>
                            <div class="grid-item_home">
                                <h2>Youths</h2>
                                <li><Link to="/Login/login">Login - Youth</Link></li>
                                <li><Link to="/Register/youthRegister">Youth Register</Link></li>
                                <li><Link to="/JobListing">Job Listing</Link></li>
                                <li><Link to="/profile">My Profile</Link></li>
                            </div>
                            <div class="grid-item_home">
                                <h2>Partners</h2>
                                <li><Link to="/Login/Partnerlogin">Login - Partner</Link></li>
                                <li><Link to="/Register/PartnerRegister">Partner Register</Link></li>
                            </div>
                            <div class="grid-item_home">
                                <h2>Job Search</h2>
                                <li><Link to="/JobListing">Job Listing</Link></li>
                            </div>
                            <div class="grid-item_home">
                                <h2>About Us</h2>
                                <li><a href="https://www.google.com/">Our website</a></li>
                                <li><a href="https://www.google.com/">Facebook</a></li>
                            </div>
                            <div class="grid-item_home_empty"></div>

                        </div>


                    </div>


                </div>




            </footer>
        </div>



    );
}


// delete all of this
export default Home;