import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import NavbarComp from "../Components/NavBar/NavbarComp";
import './PartnersSearch.css';
import Axios from "axios";

import Reviewspage from '../Components/reviews/Reviewspage';
import Reviewspost from '../Components/reviews/Reviewspost';
import StarRatings from 'react-star-ratings';
import { Button, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import Searchable from 'react-searchable-dropdown';

function PartnersPage() {
    const Dlocation = useLocation();
    const search = Dlocation.state;
    const finalsearch = search + '';

    const [companyName, SetcompanyName] = useState("");
    const [companyEmail, SetcompanyEmail] = useState("");
    const [companyUEN, SetcompanyUEN] = useState("");
    const [companyIndustry, SetcompanyIndustry] = useState("");
    const [companyOV, SetcompanyOV] = useState("");

    const [Rposts, setRPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [Numsqlsearch, SetNumsqlsearch] = useState("");
    const [sqlsearch, Setsqlsearch] = useState("");
    const [ratingTotal, SetratingTotal] = useState(0);
    const [numberRatings, SetnumberRatings] = useState(0);
    const [JobAds, SetJobAds] = useState([]);
    const [mainview, Setmainview] = useState(false)

    const changePages1 = () => {
        Setmainview(true)
    }

    const changePages2 = () => {
        Setmainview(false)
    }


    const mysqlfilter = (e) => {
        e.preventDefault()

        //console.log(Numsqlsearch)
        if (sqlsearch == "" && Numsqlsearch !== "") {
            setRPosts([]);

            Axios.post("http://localhost:3001/sort_partners_reviews4", { PID: finalsearch, fillby: Numsqlsearch }).then((response) => {
                setRPosts(response.data);
            });

        } else if (Numsqlsearch == "" && sqlsearch !== "") {


            setRPosts([]);
            setLoading(true);
            if (sqlsearch == "Newest") {

                Axios.post("http://localhost:3001/sort_partners_reviews3", { PID: finalsearch }).then((response) => {
                    setRPosts(response.data);
                });
                setLoading(false);

            } else if (sqlsearch == "Highest") {

                Axios.post("http://localhost:3001/sort_partners_reviews1", { PID: finalsearch }).then((response) => {
                    setRPosts(response.data);
                });
                setLoading(false);

            } else if (sqlsearch == "Lowest") {

                Axios.post("http://localhost:3001/sort_partners_reviews2", { PID: finalsearch }).then((response) => {
                    setRPosts(response.data);
                });
                setLoading(false);

            }

        } else if (Numsqlsearch !== "" && sqlsearch == "Newest") {

            setRPosts([]);
            Axios.post("http://localhost:3001/sort_partners_reviews5", { PID: finalsearch, fillby: Numsqlsearch }).then((response) => {
                setRPosts(response.data);
            });


        } else if (Numsqlsearch !== "" && sqlsearch == "Highest") {
            setRPosts([]);

            Axios.post("http://localhost:3001/sort_partners_reviews4", { PID: finalsearch, fillby: Numsqlsearch }).then((response) => {
                setRPosts(response.data);
            });

        } else if (Numsqlsearch !== "" && sqlsearch == "Lowest") {
            setRPosts([]);

            Axios.post("http://localhost:3001/sort_partners_reviews4", { PID: finalsearch, fillby: Numsqlsearch }).then((response) => {
                setRPosts(response.data);
            });

        } else {
            //do nothing
        }
    }

    useEffect(() => {
        document.body.style.zoom = "90%";
        Axios.post("http://localhost:3001/company_search2", { searchF: finalsearch }).then((response) => {
            SetcompanyName(response.data[0].company_name);
            SetcompanyEmail(response.data[0].email);
            SetcompanyIndustry(response.data[0].company_industry)
            SetcompanyUEN(response.data[0].UEN);
            SetcompanyOV(response.data[0].company_overview);
        });

        Axios.post("http://localhost:3001/PartnerJobAdList", {
            user_id: finalsearch
        }).then((response) => {
            SetJobAds(response.data)
        })

        Axios.post("http://localhost:3001/getstars", {
            Pid: finalsearch
        }).then((response) => {
            SetratingTotal(response.data[0].Average);
        });

        Axios.post("http://localhost:3001/getstarsNum", {
            Pid: finalsearch
        }).then((response) => {
            SetnumberRatings(response.data[0].length);
        });

        setLoading(true);
        Axios.post("http://localhost:3001/partners_reviews", { PID: finalsearch }).then((response) => {
            setRPosts(response.data);
        });
        setLoading(false);
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Rposts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div>
            <div>
                <NavbarComp />
            </div>

            <div className='partnerspage'>
                <div>
                    <h1>{companyName}</h1>
                    <p>{companyUEN}</p>
                </div>

                <div className='page_box_1'>
                    <a className='task_diff' onClick={changePages2}>
                        <h3>Jobs</h3>
                    </a>
                    <a className='task_diff' onClick={changePages1}>
                        <h3>Reviews</h3>
                    </a>

                </div>

                {mainview == false && (
                    <div>
                         <h1 className='text-primary mb-3' style={{marginTop : 30, marginLeft: 30}}>Jobs Opportunity</h1>
                        {JobAds.map((Joblist) => {
                            const list = (

                                <>
                                    <div className='JobAd_panel' style={{width: "80%", marginLeft: "12%"}}>
                                        <br></br>
                                        <div className='JobAd_body'>
                                            <div className='JobAd_Nav_Body'>
                                                <div className="Ad_detail" key={Joblist.id}>
                                                    <Nav.Link href="" style={{ color: "black", width: "40%", cursor: "pointer" }}> <h4>{Joblist.name}</h4></Nav.Link>
                                                    <p className='Modified_AD_Text'>{Joblist.job_scope}</p>
                                                    <button><Link to="../company/JobDetails" state={Joblist.opp_id}>View Job</Link></button>
                                            
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </>
                            )
                            return list
                        }
                        )}
                    </div>

                )}

                {mainview && (
                    <div>
                        <div className='reviews_text_company' style={{ padding: 20, margin: 30 }}>

                            <h1 className='text-primary mb-3'>Reviews</h1>
                            <div className='StarRatingTotal_company'>
                                <p>Average Rating</p>
                                <h2>{ratingTotal}</h2>
                                <StarRatings
                                    rating={ratingTotal}
                                    starDimension="30px"
                                    starSpacing="10px"
                                />
                                <p>Number of Ratings: {numberRatings}</p>
                            </div>
                            <div className='total_company_t' style={{ marginTop: "20" }}>

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

                        <div className='reviews_text' style={{ padding: 20, margin: 30 }}>
                            <Reviewspost Rposts={currentPosts} loading={loading} />
                            <Reviewspage
                                postsPerPage={postsPerPage}
                                totalPosts={Rposts.length}
                                paginate={paginate}
                            />

                        </div>


                    </div>
                )}
            </div>



        </div>
    );
}
// delete all of this
export default PartnersPage;