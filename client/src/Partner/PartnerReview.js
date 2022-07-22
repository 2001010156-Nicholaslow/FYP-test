import React, { useState, useEffect } from 'react';
import Reviewspage from '../Components/reviews/Reviewspage';
import Reviewspost from '../Components/reviews/Reviewspost';
import jwt_decode from 'jwt-decode';
import { BiHome } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, Link } from 'react-router-dom';
import Axios from "axios";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './PartnerReview.css';

const PartnerReview = () => {
  const id = localStorage.getItem("user_id");
  const [Rposts, setRPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [msg, Setmsg] = useState("");
  

  const token = localStorage.getItem("token");
  const [AllowUser, SetAllowUser] = useState(false);

  const nav = useNavigate();

  const Exit = () => {
    localStorage.clear()
    sessionStorage.clear()
    nav("../Login/PartnerLogin")
}

  const sortRatingbest = () => {
    setRPosts([]);
    setLoading(true);
    Axios.post("http://localhost:3001/sort_partners_reviews1", { PID: id }).then((response) => {
      setRPosts(response.data);
      console.log(response.data)
    });
    setLoading(false);
  }

  const sortRatingworst = () => {
    setRPosts([]);
    setLoading(true);
    Axios.post("http://localhost:3001/sort_partners_reviews2", { PID: id }).then((response) => {
      setRPosts(response.data);
      console.log(response.data)
    });
    setLoading(false);
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
        {
          localStorage.clear()
          sessionStorage.clear()
          nav("../Login/PartnerLogin")
        }
      }

      setLoading(true);
      Axios.post("http://localhost:3001/partners_reviews", { PID: id }).then((response) => {
        setRPosts(response.data);
        console.log(response.data)
      });
      setLoading(false);
    }
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Rposts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      {AllowUser}
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
            <NavDropdown.Item onClick={Exit}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      <div className='container mt-5'>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Sort By:
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={sortRatingbest}>Newest</Dropdown.Item>
            <Dropdown.Item onClick={sortRatingworst}>Oldest</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h1 className='text-primary mb-3'>Reviews</h1>
        <Reviewspost Rposts={currentPosts} loading={loading} />
        <Reviewspage
          postsPerPage={postsPerPage}
          totalPosts={Rposts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default PartnerReview;

/*
import React, { useState, useEffect } from "react";
import LineChart from "../Components/LineChart";
import Axios from "axios";
import moment from "moment";

function PartnerReview() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    Axios.get("http://localhost:3001/getUserCreated1").then((response) => {
      console.log(response.data);
      let payload = response.data;
      setUserData({
        labels: payload.map((data) => moment(data.date).format("YYYY/MM/DD")),
        datasets: [
          {
            label: "Users Gained",
            data: payload.map((data) => data.count),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
      console.log(moment().format("YYYY/MM/DD"));
    });
  }, []);

  return (
    <div className="App">
      <div style={{ width: 700 }}>
        <LineChart chartData={userData} />
      </div>
    </div>
  );
}

export default PartnerReview;
*/
