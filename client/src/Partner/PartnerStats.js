import React, { useState, useEffect } from 'react';
import { BiHome } from "react-icons/bi";
import TableIcons from "../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Partner.css';
import './PartnerStats.css';
import { Pie } from 'react-chartjs-2';
import StarRatings from 'react-star-ratings';
import jwt_decode from 'jwt-decode';

function PartnerStats() {

    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const [msg, Setmsg] = useState("");
    const [AllowUser, SetAllowUser] = useState(false);
    const [Applied, SetApplied] = useState("");
    const [Views, SetViews] = useState([]);

    const nav = useNavigate();

    const data_view = {
        labels: ['Applied', 'Accepted'],
        datasets: [
            {
                data: [29, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',]
            },
        ]
    }

    const Exit = () => {
        localStorage.clear()
        sessionStorage.clear()
        nav("../Login/PartnerLogin")
    }

    useEffect(() => {

        if (id == "" || token == "" || id == undefined || token == undefined) {
            nav("../Login/PartnerLogin")
        } else {
            var decoded = jwt_decode(token);


            if (decoded.id == id) {
                SetAllowUser(true)
                
                Axios.post("http://localhost:3001/get_status_view", {
                    Pid: id
                }).then((response) => {
                    SetViews(response.data);
                    console.log(response)
                });

                Axios.post("http://localhost:3001/get_status_count", {
                    Pid: id
                }).then((response) => {
                    SetApplied(response.data);
                    console.log(response);

                });

               
                
            } else {
                SetAllowUser(false)
                localStorage.clear()
                sessionStorage.clear()
                nav("../Login/PartnerLogin")
            }
        }
    }, [])


    const [columns] = useState([
        { title: "Job Name", field: "job_name" },
        {
            title: "Views",
            field: "views",
        },
        {
            title: "Applied",
            field: "applied",
        },
    ]);

    const data = [
        { job_name: "Intern", views: "120", applied: "30" },
        { job_name: "Linux Admin", views: "80", applied: "7" },
        { job_name: "Python developer", views: "302", applied: "47" },
        { job_name: "Help Desk intern", views: "194", applied: "22" },
    ];

    const options = {
        filterType: 'checkbox',
        responsive: 'stacked',
        selectableRows: false,
    };


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

            <div>
                <div className='reviews_text' style={{ padding: 20, margin: 30 }}>
                    <div>
                        <h2>{msg}</h2>
                    </div>
                    <div className='simple_stats_icon'>
                        <div className='simple_piechart'>
                            <h1>stats1</h1>
                            <Pie data={data_view} />
                        </div>
                        <div>
                            <h1>stats2</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className='status_partner'>
                    <MaterialTable
                        icons={TableIcons}
                        title="Statistic"
                        data={data}
                        columns={columns}
                    />

                </div>
            </div>
            <div className='reviews_text' style={{ padding: 20, margin: 30 }}>
                <div className='Review_header'>
                    <h1>Reviews</h1>
                </div>
                <div className='reviews_box_1'>
                    <div>
                        <div className='reviews_box'>
                            <StarRatings
                                rating={4.403}
                                starDimension="30px"
                                starSpacing="10px"
                            />
                            <h3 className='review_details_text'>A good place to work</h3>
                        </div>
                    </div>
                    <div>
                        <div className='reviews_text'>
                            <StarRatings
                                rating={5}
                                starDimension="30px"
                                starSpacing="10px"
                            />
                            <h3 className='review_details_text'>Analytical and task oriented</h3>
                        </div>
                    </div>
                    <div>
                        <div className='reviews_text'>
                            <StarRatings
                                rating={2.403}
                                starDimension="30px"
                                starSpacing="10px"
                            />
                            <h3 className='review_details_text'>Good experience to work in</h3>
                        </div>
                    </div>

                </div>
                <button className='ADbutton_edit'><Link to="../Partner/PartnerReview" >View All</Link></button>
            </div>
        </div>
    );
}


export default PartnerStats;