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
import LineChart from "../Components/LineChart";
import moment from "moment";

function PartnerStats() {

    const id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const [msg, Setmsg] = useState("");
    const [ratingTotal, SetratingTotal] = useState(0);
    const [numberRatings, SetnumberRatings] = useState(0);
    const [TotalViews, SetTotalViews] = useState("");
    const [ReviewPosts, setReviewPosts] = useState([]);
    const [TotalApplied, SetTotalApplied] = useState("");
    const [AllowUser, SetAllowUser] = useState(false);
    const [validcomp, Setvalidcomp] = useState(false);
    const [Applied, SetApplied] = useState([]);
    const [Views, SetViews] = useState([]);

    const [PartnerData, setPartnerData] = useState();
    const [Data, setData] = useState([]);


    const nav = useNavigate();

    const data_view = {
        labels: ['Applied', 'Accepted'],
        datasets: [
            {
                data: [TotalViews, TotalApplied],
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


    /*const status_data = () => {
        for (let i = 0; i < Views.length; i++) {
            Data.push({ job_name: Views[i].name, views: Views[i].views, applied: Applied[i].Applied })
        }
        console.log(Data)

    }*/

    //const [tableData] = useState([]);

    useEffect(() => {

        document.body.style.zoom = "90%";

        if (id == "" || token == "" || id == undefined || token == undefined) {
            nav("../Login/PartnerLogin")
        } else {
            var decoded = jwt_decode(token);
            Axios.post("http://localhost:3001/LoginCheckPartner", {
                user_id: id
            }).then((response) => {
                Setmsg(response.data);
            });

            if (decoded.id == id) {
                SetAllowUser(true)
                Axios.post("http://localhost:3001/get_status_view", {
                    Pid: id
                }).then((response) => {
                    //SetViews(response.data);

                    Axios.post("http://localhost:3001/getstars", {
                        Pid: id
                    }).then((response) => {
                        SetratingTotal(response.data[0].Average);
                    });

                    Axios.post("http://localhost:3001/getstarsNum", {
                        Pid: id
                    }).then((response) => {
                        SetnumberRatings(response.data[0].length);
                    });

                    Axios.post("http://localhost:3001/partners_reviews_top", { PID: id }).then((response) => {
                        console.log(response.data.length)
                        if(response.data.length > 0) {
                            Setvalidcomp(true)
                            setReviewPosts(response.data);
                        }else{
                            setReviewPosts("");
                        }
                    });

                    for (let i = 0; i < response.data.length; i++) {
                        Axios.post("http://localhost:3001/get_status_count2", {
                            Pid: id,
                            result: response.data[i].opp_id
                        })
                    }

                    Axios.get("http://localhost:3001/getPartnerViews").then((response) => {
                        let payload = response.data;
                        setPartnerData({
                            labels: payload.map((data) => moment(data.date).format("YYYY/MM/DD")),
                            datasets: [
                                {
                                    label: "Partner Views",
                                    data: payload.map((data) => data.count),
                                    backgroundColor: ["rgba(183, 19, 19, 0.8)"],
                                    borderWidth: 2,
                                },
                            ],
                        });
                        //console.log(moment().format("YYYY/MM/DD"));
                    });

                    Axios.post("http://localhost:3001/get_status_view_final", {
                        Pid: id
                    }).then((response) => {
                        for (let i = 0; i < response.data.length; i++) {
                            setData(Data => [...Data, { job_name: response.data[i].name, views: response.data[i].views, applied: response.data[i].applied }]);
                        }
                    });


                    Axios.post("http://localhost:3001/get_total_views", {
                        Pid: id
                    }).then((response) => {
                        SetTotalViews(response.data[0].Vtotal);
                    });


                    Axios.post("http://localhost:3001/get_total_applied", {
                        Pid: id
                    }).then((response) => {
                        SetTotalApplied(response.data[0].Atotal);
                    });
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
                        <NavDropdown.Item href="./EditPartnerProfile">Edit profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={Exit}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Navbar>

            <div>
                <div className='title_name'>
                    <h2>Statics For :{msg}</h2>
                </div>
                <div className='total_chart_t'>
                    <div className='reviews_text_charts' style={{ padding: 20, margin: 30 }}>

                        <div className='simple_stats_icon'>
                            <div className='simple_piechart'>
                                <p>Applicants By Total</p>
                                <Pie data={data_view} />
                            </div>
                        </div>
                        <div className='both_text_piechart'>
                            <div className='text_piechart'>
                                <p>Total Number of Applicants: {TotalApplied}</p>

                            </div>
                            <div className='text_piechart'>
                                <p>Total Number of Views: {TotalViews}</p>

                            </div>

                        </div>


                    </div>

                    <div className='reviews_text_charts' style={{ padding: 20, margin: 30 }}>
                        <div className="App">
                            <div style={{ width: 700 }}>
                                <LineChart chartData={PartnerData} />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div>
                <div className='status_partner'>
                    <MaterialTable
                        icons={TableIcons}
                        title="Statistic"
                        data={Data}
                        columns={columns}
                    />

                </div>
            </div>

            <div className='reviews_text' style={{ padding: 20, margin: 30 }}>
                <div className='StarRatingTotal_1'>
                    <p>Average Rating</p>
                    <h2>{ratingTotal}</h2>
                    <StarRatings
                        rating={ratingTotal}
                        starDimension="30px"
                        starSpacing="10px"
                    />
                    <p>Number of Ratings: {numberRatings}</p>
                </div>
            </div>
            {validcomp && (
                <div className='reviews_text' style={{ padding: 20, margin: 30 }}>

                <div className='Review_header'>
                    <h1>Reviews</h1>
                </div>


                <div className='reviews_box_1'>
                {ReviewPosts.map((ReviewPostslist) => {
                    const list = (

                        <>
                        <div>
                        <div className='reviews_text'>
                            <StarRatings
                                rating={ReviewPostslist.rating}
                                starDimension="30px"
                                starSpacing="10px"
                            />
                            <h3 className='review_details_text'>{ReviewPostslist.review}</h3>
                            <h5 className='review_details_text'>{ReviewPostslist.created_at}</h5>
                        </div>
                    </div>
                        </>
                    )
                    return list
                }   
                )}
                    
                   

                </div>
                <button className='ADbutton_edit'><Link to="../Partner/PartnerReview" >View All</Link></button>
            </div>
            )}
        </div>
    );
}


export default PartnerStats;