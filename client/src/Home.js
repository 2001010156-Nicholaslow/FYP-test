import React, { useEffect, useState } from "react";
import "./Home.css";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Axios from "axios";

function Home() {
  const [jobData, setJobData] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:3001/admin_get_opp", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setJobData(response.data);
      console.log(jobData);
    });
  }, []); // the API to bring all data from the job opp data to UI - nehal

  return (
    <div classNameName="Home_page">
      <div>
        <div classNameName="search_banner">
          <h1 classNameName="home_title_text">Find your dream jobs with us!</h1>
          <p classNameName="home_title_text">Search by name or skills</p>
          <div classNameName="search_bar">
            <input
              type="text"
              placeholder="Search Job by Title or Keyword"
              classNameName="text_search"
            />
            <button type="button" classNameName="button_search_home">
              <div classNameName="image_icon_home">
                <BiSearchAlt />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
            /*  style="max-width: 600px; visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;" */
          >
            <h6 className="text-primary">Our Services</h6>
            <h1 className="mb-4">
              We Are Pioneers In The World Of Renewable Energy
            </h1>
          </div>
          <div className="row g-4">
            <div
              className="col-md-6 col-lg-4 wow fadeInUp"
              data-wow-delay="0.1s"
              /* style="visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;" */
            >
              <div className="service-item rounded overflow-hidden">
                <img className="img-fluid" src="img/img-600x400-1.jpg" alt="" />
                <div className="position-relative p-4 pt-0">
                  <div className="service-icon">
                    <i className="fa fa-solar-panel fa-3x"></i>
                  </div>
                  <h4 className="mb-3">Solar Panels</h4>
                  <p>
                    Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam
                    lorem diam.
                  </p>
                  <a className="small fw-medium" href="">
                    Read More<i className="fa fa-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <footer classNameName="home_footer">
        <div classNameName="home_footer_container">
          <div classNameName="home_footer_row">
            <div className="grid-container_home">
              <div className="grid-item_home_empty"></div>
              <div className="grid-item_home">
                <h2>Youths</h2>
                <li>
                  <Link to="/Login/login">Login - Youth</Link>
                </li>
                <li>
                  <Link to="/Register/youthRegister">Youth Register</Link>
                </li>
                <li>
                  <Link to="/JobListing">Job Listing</Link>
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
              </div>
              <div className="grid-item_home">
                <h2>Partners</h2>
                <li>
                  <Link to="/Login/Partnerlogin">Login - Partner</Link>
                </li>
                <li>
                  <Link to="/Register/PartnerRegister">Partner Register</Link>
                </li>
              </div>
              <div className="grid-item_home">
                <h2>Job Search</h2>
                <li>
                  <Link to="/JobListing">Job Listing</Link>
                </li>
              </div>
              <div className="grid-item_home">
                <h2>About Us</h2>
                <li>
                  <a href="https://www.google.com/">Our website</a>
                </li>
                <li>
                  <a href="https://www.google.com/">Facebook</a>
                </li>
              </div>
              <div className="grid-item_home_empty"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// delete all of this
export default Home;
