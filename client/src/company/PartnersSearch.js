import React, { useState, useEffect } from 'react';
import Reviewspage from '../Components/reviews/Reviewspage';
import Companypost from '../Components/reviews/Companypost';
import NavbarComp from "../Components/NavBar/NavbarComp";
import Axios from "axios";
import './PartnersSearch.css';
import { BiSearchAlt } from "react-icons/bi";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

function PartnersSearch() {

    //const [msg, Setmsg] = useState("");
    const [searchValue, SetsearchValue] = useState("");
    const [Cposts, setCPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const [validcomp, Setvalidcomp] = useState(false);
    const [validcompText, SetvalidcompText] = useState("");

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = Cposts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const toggleSearch = () => {
        setLoading(true);
        Axios.post("http://localhost:3001/company_search", { searchV: searchValue }).then((response) => {
            console.log(response.data.length)
            if (response.data.length > 0) {
                setCPosts(response.data);
                Setvalidcomp(true)
            } else {
                SetvalidcompText("No result found")
            }
            
        });
        setLoading(false);
    };

    /* useEffect(() => {
         setLoading(true);
         Axios.post("http://localhost:3001/company_search", { searchV: searchValue }).then((response) => {
             setRPosts(response.data);
 
         });
         setLoading(false);
     }, []);
 */
    return (
        <div>
            <div>
                <NavbarComp />
            </div>

            <div style={{ marginTop: 80 }}>
                <div className="search_banner">
                    <p className="home_title_text">Search by company name</p>
                    <div className="search_bar_1">
                        <input type="text" placeholder="Search partners" className="text_search" onChange={(e) => { SetsearchValue(e.target.value) }} />
                        <button type="button" className="button_search_home" onClick={toggleSearch}>
                            <div className="image_icon_home">
                                <BiSearchAlt />
                            </div>
                        </button>
                    </div>
                    <small id="passwordHelpInline" class="text-muted" style={{ color: "black" }}>
                        <Link to="../Partner/PartnerFormEdit" >Edit</Link>
                    </small>

                </div>

            </div>

            {validcomp && (
                <div style={{ marginTop: 80 }}>
                    <div className="search_banner">
                        <Companypost Cposts={currentPosts} loading={loading} />
                        <Reviewspage
                            postsPerPage={postsPerPage}
                            totalPosts={Cposts.length}
                            paginate={paginate}
                        />


                    </div>

                </div>

            )}

        </div>
    );
}
// delete all of this
export default PartnersSearch;