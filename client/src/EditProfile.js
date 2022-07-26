import Axios from "axios";
import React from "react";
import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react"

import './EditProfile.css'
import { Alert } from "react-bootstrap";

function EditProfile(){

    
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
        Axios.post('http://localhost:3001/users/save', values, config).then(
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
        Axios.get('http://localhost:3001/users/' + localStorage.getItem("Uid")).then(
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
                <h1>Edit Profile</h1>
                <div className="editProfileSection">
                    <h1>Basic Info</h1>
                    <div className="editProfileRow">
                        <label htmlFor="fullName">Full name:</label>
                        <input type="text" id="fullName" name="fullName" defaultValue={items.full_name}></input>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" defaultValue={items.gender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input type="date" id="dob" name="dob" defaultValue={items.dob}></input>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="citizenship">Citizenship:</label>
                        <select id="citizenship" name="citizenship" defaultValue={items.citizenship}>
                            <option value="Singaporean">Singaporean</option>
                            <option value="Permanent Resident">Permanent Resident</option>
                            <option value="Foreigner">Foreigner</option>
                        </select>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="country">Country:</label>
                        <select id="country" name="country" defaultValue={items.country}>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Korea">Korea</option>
                            <option value="Japan">Japan</option>
                            <option value="South Korea">South Korea</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Philippines">Philippines</option>
                            <option value="USA">USA</option>
                            <option value="EU">Europe</option>
                        </select>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" name="address" defaultValue={items.address}></input>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="postalcode">Postal Code:</label>
                        <input type="text" id="postalcode" name="postalcode" defaultValue={items.postalcode}></input>
                    </div>
                    <div className="editProfileRow">
                        <label htmlFor="education">Education:</label>
                        <select id="education" name="education" defaultValue={items.education}>
                            <option value="GCE O Level">GCE 'O' Level</option>
                            <option value="GCE N Level">GCE 'N' Level</option>
                            <option value="GCE A Level">GCE 'A' Level</option>
                            <option value="Diploma/Degree">Diploma/Degree</option>
                            <option value="Bachelor">Bachelor</option>
                            <option value="Master">Master</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
                <div className="editProfileSection">
                    <h1>About Me</h1>
                    <label htmlFor="bio" hidden>About me</label>
                    <textarea style={{width: "100%"}} id="bio" name="bio" defaultValue={items.user_bio}></textarea>
                </div>
                <div className="editProfileSection">
                    <h1>Contact Info</h1>
                    <div className="editProfileRow">
                        <label htmlFor="number">Phone Number:</label>
                        <input type="text" id="number" name="number" defaultValue={items.contact_number}></input>
                    </div>
                </div>
                <button type="submit">Save</button>
            </div>
        </form>
        );
    }
}

export default EditProfile;