import React, { useState, useEffect } from 'react';
import Reviewspage from '../Components/reviews/Reviewspage';
import Reviewspost from '../Components/reviews/Reviewspost';
import jwt_decode from 'jwt-decode';
import { BiHome } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, Link } from 'react-router-dom';
import Axios from "axios";
import { Button, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import './PartnerReview.css';
import Searchable from 'react-searchable-dropdown';

const PartnerReview = () => {
  const id = localStorage.getItem("user_id");
  const [Rposts, setRPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [msg, Setmsg] = useState("");
  const [filterby, Setfilterby] = useState("");
  const [filterby2, Setfilterby2] = useState("");
  const [Numsqlsearch, SetNumsqlsearch] = useState("");
  const [sqlsearch, Setsqlsearch] = useState("");

  const token = localStorage.getItem("token");
  const [AllowUser, SetAllowUser] = useState(false);

  const nav = useNavigate();

  const Exit = () => {
    localStorage.clear()
    sessionStorage.clear()
    nav("../Login/PartnerLogin")
  }

  const refreshPage = () => {
    nav(("../Partner/PartnerStats"))
  }

  const mysqlfilter = (e) => {
    e.preventDefault()

    //console.log(Numsqlsearch)
    if (sqlsearch == "" && Numsqlsearch !== "") {
      setRPosts([]);

      Axios.post("http://localhost:3001/sort_partners_reviews4", { PID: id, fillby: Numsqlsearch }).then((response) => {
        setRPosts(response.data);
        console.log(response.data)
      });

    } else if (Numsqlsearch == "" && sqlsearch !== "") {


      setRPosts([]);
      setLoading(true);
      if (sqlsearch == "Newest") {

        Axios.post("http://localhost:3001/sort_partners_reviews3", { PID: id }).then((response) => {
          setRPosts(response.data);
        });
        setLoading(false);

      } else if (sqlsearch == "Highest") {

        Axios.post("http://localhost:3001/sort_partners_reviews1", { PID: id }).then((response) => {
          setRPosts(response.data);
        });
        setLoading(false);

      } else if (sqlsearch == "Lowest") {

        Axios.post("http://localhost:3001/sort_partners_reviews2", { PID: id }).then((response) => {
          setRPosts(response.data);
        });
        setLoading(false);

      }

    } else if (Numsqlsearch !== "" && sqlsearch == "Newest") {

      setRPosts([]);
      Axios.post("http://localhost:3001/sort_partners_reviews5", { PID: id, fillby: Numsqlsearch }).then((response) => {
        setRPosts(response.data);
      });


    } else if (Numsqlsearch !== "" && sqlsearch == "Highest") {
      setRPosts([]);

      Axios.post("http://localhost:3001/sort_partners_reviews4", { PID: id, fillby: Numsqlsearch }).then((response) => {
        setRPosts(response.data);
        console.log(response.data)
      });

    } else if (Numsqlsearch !== "" && sqlsearch == "Lowest") {
      setRPosts([]);

      Axios.post("http://localhost:3001/sort_partners_reviews4", { PID: id, fillby: Numsqlsearch }).then((response) => {
        setRPosts(response.data);
        console.log(response.data)
      });

    } else {
      //do nothing
    }


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
            <NavDropdown.Item href="./EditPartnerProfile">Edit profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={Exit}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>

      <div className='container mt-5'>
      <p>
            <Button onClick={refreshPage}>Back</Button>
          </p>

        <div className='reviews_text' style={{ padding: 20, margin: 30, width: "100%", maxWidth: 800 }}>
          <h1 className='text-primary mb-3'>Reviews</h1>
          <div className='total_chart_t1'>

            <Searchable
              value=""
              placeholder="Filter By Rating" // by default "Search"
              notFoundText="No result found" // by default "No result found"
              noInput
              options={[
                {
                  value: '5',
                  label: '5 Stars'
                }, {
                  value: '4',
                  label: '4 Stars'
                }, {
                  value: '3',
                  label: '3 Stars'
                }, {
                  value: '2',
                  label: '2 Stars'
                }, {
                  value: '1',
                  label: '1 Stars'
                }
              ]}
              onSelect={(e) => {
                SetNumsqlsearch(e)
                console.log(e)
              }}
              listMaxHeight={140} //by default 140
            />


            <Searchable
              value=""
              placeholder="Sorting" // by default "Search"
              notFoundText="No result found" // by default "No result found"
              noInput
              options={[
                {
                  value: 'Newest',
                  label: 'Most Recent'
                }, {
                  value: 'Highest',
                  label: 'Highest Rating'
                }, {
                  value: 'Lowest',
                  label: 'Lowest Rating'
                },
              ]}
              onSelect={(e) => {

                Setsqlsearch(e)

                //console.log(e)
              }}
              listMaxHeight={140} //by default 140
            />


            <Button variant="primary" className='buttonmysqlfilter' onClick={mysqlfilter}>filter</Button>


          </div>
        </div>

        <div className='reviews_text' style={{ padding: 20, margin: 30, width: "100%", maxWidth: 800 }}>
          <Reviewspost Rposts={currentPosts} loading={loading} />
          <Reviewspage
            postsPerPage={postsPerPage}
            totalPosts={Rposts.length}
            paginate={paginate}
          />

        </div>


      </div>
    </div>
  );
};

export default PartnerReview;
