import React, { useState, useEffect } from 'react';
import NavbarComp from "../Components/NavBar/NavbarComp";
import Axios from "axios";
import './PartnersSearch.css';
import { Form } from "react-bootstrap";

function PartnersSearch() {

    //const [msg, Setmsg] = useState("");
    const [searchValue, SetsearchValue] = useState("");
    const [searchUEN, SetsearchUEN] = useState("");

    return (
        <div>
            <div>
                <NavbarComp />
            </div>

            <div className="search_partners_home">
                <p>Search for Partners</p>

                <Form>
                    <Form.Group controlId="searchValue" style={{ marginTop: 30 }} >
                        <Form.Label className="label">Search</Form.Label>
                        <Form.Control
                            style={{ width: 380, color: "black" }}
                            type="text"
                            value={searchValue}
                            name="searchValue"
                            required
                            onChange={(e) => { SetsearchValue(e.target.value) }}
                        />

                        <Form.Control
                            
                            type="radio"
                            value="Option 1"
                            name="searchUEN"
                            required
                            id="searchUEN"
                            onChange={(e) => { SetsearchUEN(e.target.value) }}
                        />
                        <Form.Label className="label">Search</Form.Label>
                       


                    </Form.Group>

                </Form>

            </div>
            <h1>This is the ParnterSEARCH page</h1>
        </div>
    );
}
// delete all of this
export default PartnersSearch;