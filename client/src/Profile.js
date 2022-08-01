import React from "react";
import NavbarComp from "./Components/NavBar/NavbarComp";
import Axios from "axios";
import { useState, useEffect } from "react"

import './EditProfile.css'
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Profile(){

    const { userId } = useParams();
   
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/users/' + userId).then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                response.data.dob = response.data.dob.slice(0,10);
                setItems(response.data);
            }, (error) =>{
                setIsLoaded(true);
                setIsError(true);
            }
        )
    }, []);

    if(!isLoaded)
    {
        return(
            <div>
            <NavbarComp />
            <div className="editProfile">
                <h1>Your Profile</h1>
                <div>loading!</div>
            </div>
            </div>
        );
    }
    else
    {
        if(isError)
            return(<div><NavbarComp />error</div>);

        return(
        <div>
            <NavbarComp />
            <div className="editProfile">
                <h1>{items.full_name}'s Profile</h1>
                <div style={{display: "flex", justifyContent: "flex-start"}}>
                    <div style={{flexGrow: "1", paddingRight: "1em"}}>
                        <div className="editProfileSection">
                            <h1>{items.full_name}</h1>
                                <div>Gender: {items.gender}</div>
                                <div>Country: {items.country}</div>
                                <div>Date of Birth: {items.dob}</div>
                        </div>
                        {localStorage.getItem("Uid") == userId ? <Button variant="warning">
                            <Link to="/profile/edit">Edit</Link>
                        </Button>: null}
                    </div>
                    <div style={{flexGrow: "3"}}>
                        <div className="editProfileSection">
                            <h1>About</h1>
                            <textarea style={{width: "100%"}} id="bio" name="bio" readOnly defaultValue={items.user_bio}></textarea>
                        </div>
                        <div className="editProfileSection">
                            <h1>Contact Info</h1>
                            <div>Email: {items.email}</div>
                            <div>Contact Number: {items.contact_number}</div>
                        </div>
                        <div className="editProfileSection">
                            <h1>Additional Info</h1>
                            <div>Education: {items.education}</div>
                            <div>Citizenship: {items.citizenship}</div>
                            <div>Address: {items.address}</div>
                            <div>Postal Code: {items.postalcode}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
// delete all of this
export default Profile;