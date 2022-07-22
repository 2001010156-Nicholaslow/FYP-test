import React, { useEffect, useState } from "react";
import "./Home.css";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import NavbarComp from "./Components/NavBar/NavbarComp";


function Home() {
  const [jobData, setJobData] = useState([]);
  const [multiSelections, setMultiSelections] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    Axios.get("http://localhost:3001/admin_get_opp", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      setJobData(response.data);
      console.log(jobData);
      console.log(response);

    });
  }, []); // the API to bring all data from the job opp data to UI - nehal
  const onChange = () => {

  }
  return (
    <div classNameName="Home_page">
      <div>
      <div>
      <NavbarComp />
    </div>
        <div classNameName="search_banner">
          <h1 classNameName="home_title_text">Find your dream jobs with us!</h1>
          <p classNameName="home_title_text">Search by name or skills</p>
          <div classNameName="search_bar">
            <Typeahead
              id="basic-typeahead-multiple"
              labelKey="name"
              multiple
              onChange={setMultiSelections}
              options={jobData}
              placeholder="pick a job..."
              selected={multiSelections}
              filterBy={['name', 'location', 'position_level', 'company_name', 'salary', 'qualification', 'opp_id']}

            />
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <h6 className="text-primary">jobs</h6>
            <h1 className="mb-4">
              Job Opportunities
            </h1>
          </div>
          <div className="row g-4">
            {multiSelections.length > 0 && multiSelections.map(x => <div
              className="col-md-5 col-lg-11 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded overflow-hidden">
                <img className="img-fluid" src="img/img-600x400-1.jpg" alt="" />
                <div className="position-relative p-4 pt-0">
                  <div className="service-icon">
                    <i className="fa fa-solar-panel fa-3x"></i>
                  </div>
                  <h4 className="mb-3"> Name: {x.name}</h4>
                  <p>
                    Company Name: {x.company_name}
                  </p>
                  <p>
                    Job Position: {x.position_level}
                  </p>
                  <p>
                    Location: {x.location}
                  </p>
                  <p>
                    salary: ${x.salary}
                  </p>
                  <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    View more
                  </Button>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                    <p>
                    ID: {x.opp_id}
                  </p>
                  <p>
                    Years to serve: {x.required_yrs}
                  </p>
                  <p>
                  Industry for {x.name}: {x.industry}
                  </p>
                  <p>
                  Job salary for {x.name}: ${x.salary}
                  </p>
                  <p>
                  Job qualification for {x.name}: {x.qualification}
                  </p>
                  <p>
                    Any Additional requirements: {x.additional_requirements}
                  </p>
                  <p>
                    Socpe for {x.name}: {x.job_scope}
                  </p>
                  <p>
                  Job description: {x.description}
                  </p>
                    </div>
                  </Collapse>
                  <div>
                  </div>
                  <a>
                    ________________________________________________________________________________________________________________________________________________________________
                  </a>
                </div>
              </div>
            </div>)}
            {multiSelections.length === 0 && jobData.map(x => <div
              className="col-md-5 col-lg-11 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="service-item rounded overflow-hidden">
                <img className="img-fluid" src="img/img-600x400-1.jpg" alt="" />
                <div className="position-relative p-4 pt-0">
                  <div className="service-icon">
                    <i className="fa fa-solar-panel fa-3x"></i>
                  </div>
                  <h4 className="mb-3"> Name: {x.name}</h4>
                  <p>
                    Company Name: {x.company_name}
                  </p>
                  <p>
                    Job Position: {x.position_level}
                  </p>
                  <p>
                  Location: {x.location}
                  </p>
                  <p>
                    salary: ${x.salary}
                  </p>
                  {/* <a className="small fw-medium" href="">
                    Read More<i className="fa fa-arrow-right ms-2"></i>
                  </a> */}
                  <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    View more
                  </Button>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                    <p>
                    ID: {x.opp_id}
                  </p>
                  <p>
                    Years to serve: {x.required_yrs}
                  </p>
                  <p>
                  Industry for {x.name}: {x.industry}
                  </p>
                  <p>
                  Job salary for {x.name}: ${x.salary}
                  </p>
                  <p>
                  Job qualification for {x.name}: {x.qualification}
                  </p>
                  <p>
                    Any Additional requirements: {x.additional_requirements}
                  </p>
                  <p>
                    Socpe for {x.name}: {x.job_scope}
                  </p>
                  <p>
                  Job description: {x.description}
                  </p>
                    </div>
                  </Collapse>
                  <div>
                  </div>
                  <a>
                    ________________________________________________________________________________________________________________________________________________________________
                  </a>
                </div>
              </div>
            </div>)}
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
                  <Link to="/">Job Listing</Link>
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
                  <Link to="/">Job Listing</Link>
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

export default Home;
