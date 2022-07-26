import Axios from "axios";
import React from "react";
import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react"

import './EditProfile.css'
import { Alert } from "react-bootstrap";

function EditPartnerProfile(){

    
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isUpdatedBefore, setUpdateBefore] = useState(false);
    const [isUpdateSuccess, setUpdateSuccess] = useState(false);
    const [isUpdateFailed, setUpdateFailed] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");
    const [items, setItems] = useState([]);

    const [selectedFile, setSelectedFile] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const values = Object.fromEntries(data.entries());

        const config = {headers: {
            "x-access-token": localStorage.getItem("token"),
        }}
        Axios.post('http://localhost:3001/partners/save', values, config).then(
            (response) => {
                setUpdateBefore(true);
                setUpdateSuccess(true);
                console.log(response);
            }, (error) => {
                setUpdateBefore(true);
                setUpdateFailed(true);
                console.log(error);
            }
        )
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/partners/' + localStorage.getItem("user_id")).then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                setItems(response.data);
            }, (error) =>{
                console.log(error);
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, []);

    if(!isLoaded)
    {
        return(
            <div className="editProfile">
                <h1>Edit Profile</h1>
                <div>loading!</div>
            </div>
        );
    }
    else
    {
        if(isError)
            return(<div>error</div>);

        return(
        <form onSubmit={handleSubmit}>
            <div className="editProfile">
                {isUpdatedBefore && isUpdateSuccess && <Alert variant="success">Profile Updated!</Alert>}
                {isUpdatedBefore && isUpdateFailed && <Alert variant="danger">Profile failed to update</Alert>}
                <h1>Edit Partner Profile</h1>
                <div className="editProfileSection">
                    <h1>Basic Info</h1>
                    <div className="editProfileRow">
                        <label htmlFor="companyName">Company Name:</label>
                        <input type="text" id="companyName" name="companyName" defaultValue={items.company_name}></input>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="companyIndustry">Company Industry:</label>
                        <input type="text" id="companyIndustry" name="companyIndustry" defaultValue={items.company_industry}></input>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="uen">UEN:</label>
                        <input type="text" id="uen" name="uen" defaultValue={items.UEN}></input>
                    </div>
                </div>
                <div className="editProfileSection">
                    <h1>Company Overview</h1>
                    <label htmlFor="companyOverview" hidden>Company Overview:</label>
                    <textarea style={{width: "100%"}} id="companyOverview" name="companyOverview" defaultValue={items.company_overview}></textarea>
                </div>
                <div className="editProfileSection">
                    <h1>Contact Info</h1>
                    <div className="editProfileRow">
                        <label htmlFor="contactName">Contact Name:</label>
                        <input type="text" id="contactName" name="contactName" defaultValue={items.contact_name}></input>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input type="text" id="contactNumber" name="contactNumber" defaultValue={items.contact_number}></input>
                    </div>
                </div>
                <button type="submit">Save</button>
            </div>
        </form>
        );
    }
}

export default EditPartnerProfile;