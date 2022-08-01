import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import "react-bootstrap-typeahead/css/Typeahead.css";
import NavbarComp from "./Components/NavBar/NavbarComp";

function Home() {
  const [appData, setapplication] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/opportunitys/application", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      window.localStorage.setItem("Application", JSON.stringify(response.data));
      const userId = JSON.parse(localStorage.getItem("user_data")).result[0]
        .user_id;
      const jobStaus = response.data.filter((x) => x.user_id === userId);
      setapplication(jobStaus);
      console.log(appData);
      console.log(response);
    });
  }, []);
  const onChange = () => {};
  const user_data = JSON.parse(window.localStorage.getItem("user_data"));
  const user = user_data?.result[0];

  console.log("user_data", user);
  return (
    <div classNameName="Home_page">
      <div>
        <div>
          <NavbarComp />
        </div>
        <h2>Welcome</h2>
        <h3>{user?.full_name}</h3>
      </div>
      {appData && appData.map((x) => 
      <h4>{x.status} by: {x.company_name}</h4>)}
      <div></div>
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
                  <Link to="/JobListing">opp Listing</Link>
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
                <h2>opp Search</h2>
                <li>
                  <Link to="/JobListing">opp Listing</Link>
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
