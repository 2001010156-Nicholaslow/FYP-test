import React, { useState, useEffect } from 'react';
import NavbarComp from "../Components/NavBar/NavbarComp";
import Axios from "axios";
import './PartnersSearch.css';
import { BiSearchAlt } from "react-icons/bi";
import { Form} from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

function PartnersSearch() {

    //const [msg, Setmsg] = useState("");
    const [searchValue, SetsearchValue] = useState("");
    const [searchUEN, SetsearchUEN] = useState("");

    return (
        <div>
            <div>
                <NavbarComp />
            </div>

            <div style={{ marginTop: 80 }}>
                <div className="search_banner">
                    <p className="home_title_text">Search by company name</p>
                    <div className="search_bar_1">
                        <input type="text" placeholder="Search partners" className="text_search" />
                        <button type="button" className="button_search_home">
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

        </div>
    );
}
// delete all of this
export default PartnersSearch;