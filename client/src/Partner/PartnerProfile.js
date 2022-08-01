import Axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom"; 
import { useState, useEffect } from "react"

import '../EditProfile.css'
import { Alert, Button } from "react-bootstrap";

function PartnerProfile(){

    const { userId } = useParams();
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isUpdatedBefore, setUpdateBefore] = useState(false);
    const [isUpdateSuccess, setUpdateSuccess] = useState(false);
    const [isUpdateFailed, setUpdateFailed] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");
    const [items, setItems] = useState([]);

    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        Axios.get('http://localhost:3001/partners/' + userId).then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                setItems(response.data);
                console.log(response.data);
            }, (error) => {
                console.log(error);
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, []);

    if(!isLoaded)
    {
        return(
            <div>
            <div className="editProfile">
                <div>loading!</div>
            </div>
            </div>
        );
    }
    else
    {
        if(isError)
            return(<div>error</div>);

        return(
        <div>
            <div className="editProfile">
                <h1>{items.company_name} Profile</h1>
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <div style={{flexGrow: "1", paddingRight: "1em"}}>
                        <div className="editProfileSection">
                            <h1>{items.full_name}</h1>
                                <div>UEN: {items.UEN}</div>
                                <div>Industry: {items.company_industry}</div>
                        </div>
                        {localStorage.getItem("user_id") == userId ? <Button variant="warning">
                            <Link to="/Partner/PartnerProfile/Edit">Edit</Link>
                        </Button>: null}
                    </div>
                    <div style={{flexGrow: "3"}}>
                        <div className="editProfileSection">
                            <h1>Overview</h1>
                            <textarea style={{width: "100%"}} readOnly defaultValue={items.company_overview}></textarea>
                        </div>
                        <div className="editProfileSection">
                            <h1>Contact Info</h1>
                            <div>Name: {items.contact_name}</div>
                            <div>Contact Number: {items.contact_number}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default PartnerProfile;