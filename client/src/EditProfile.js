import Axios from "axios";
import React from "react";
import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react"

import './EditProfile.css'

function EditProfile(){

    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [items, setItems] = useState([]);

    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        Axios.get('http://localhost:3001/users/' + '1').then(
            (response) => {
                setIsLoaded(true);
                console.log(response.status);

                setIsError(false);
                setItems(response.data)
            }, (error) =>{
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
        return(
        <form>
            <div className="editProfile">
                <h1>Edit Profile</h1>
                <div className="editProfileSection">
                    <h1>Basic Info</h1>
                    <div className="editProfileRow">
                        <label htmlFor="fullName">Full name:</label>
                        <input type="text" id="fullName" name="fullName" defaultValue={items.full_name}></input>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="gender">Gender:</label>
                        <input type="text" id="gender" name="gender" defaultValue={items.gender}></input>
                    </div>
                    <div className="editProfileRow">
                        <div>Date of Birth</div>
                        <div>yeah</div>
                    </div>
                </div>
                <div className="editProfileSection">
                    <h1>About Me</h1>
                    <label htmlFor="bio" hidden>About me:</label>
                    <textarea style={{width: "100%"}} id="bio" name="bio" defaultValue={items.user_bio}></textarea>
                </div>
                <div className="editProfileSection">
                    <h1>Contact Info</h1>
                </div>
                <div className="editProfileSection">
                    <h1>Security</h1>
                    <div className="editProfileRow">
                        <div>Email</div>
                        <div>yeah</div>
                    </div>
                    <div className="editProfileRow">
                        <div>Password</div>
                        <div>Enter old pass</div>
                        <div>Enter new pass</div>
                        <div>Confirm new pass</div>
                    </div>
                </div>
                <button>Save</button>
            </div>
        </form>
        );
    }
}

export default EditProfile;