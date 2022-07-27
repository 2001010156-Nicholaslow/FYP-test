import React, { useEffect, useState } from "react";
import NavbarComp from "./Components/NavBar/NavbarComp";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Axios from "axios";




function JobDiscription() {
    // const [jobData, setJobData] = useState({});
    const jobs = JSON.parse(window.localStorage.getItem("jobData"));
    console.log("12345", jobs);
    const opp_id = parseInt(window.localStorage.getItem("opp_id"));
    console.log("qwe", opp_id);
    const jov = jobs.filter((x) => x.opp_id === opp_id);
    console.log("hello hello", jov);
    // setJobData(jov[0]);
    const jobData = jov[0];
    const save_to_fav = () => {    
        //  console.log(JSON.parse(localStorage.getItem("user_data")).result[0].user_id) 
        Axios.post('http://localhost:3001/profile_save_fav',{
            user_id: JSON.parse(localStorage.getItem("user_data")).result[0].user_id,
            opp_id: jobData.opp_id
        }, {

          }).then((response) => {

            console.log(response);
          });
    }
    return (
        <div>
            <div>
                <NavbarComp />
            </div>
            <div class="container p-5 my-5 bg-dark  text-white">
                <h4 className="mb-3"> Name: {jobData.name}</h4>
                <p>
                    Company Name: {jobData.company_name}
                </p>
                <p>
                    Job Position: {jobData.position_level}
                </p>
                <p>
                    Location: {jobData.location}
                </p>
                <p>
                    salary: ${jobData.salary}
                </p>
                <p>
                    ID: {jobData.opp_id}
                </p>
                <p>
                    Years to serve: {jobData.required_yrs}
                </p>
                <p>
                    Industry for {jobData.name}: {jobData.industry}
                </p>
                <p>
                    Job salary for {jobData.name}: ${jobData.salary}
                </p>
                <p>
                    Job qualification for {jobData.name}: {jobData.qualification}
                </p>
                <p>
                    Any Additional requirements: {jobData.additional_requirements}
                </p>
                <p>
                    _____________________________________________________________________________________________________________________________
                </p>
                <div class="row">
                    <div class="col-sm-6">
                        <p>
                            <h3>Socpe for {jobData.name}:</h3> {jobData.job_scope}
                        </p>
                    </div>
                    <div class="col-sm-6">
                        <p>
                            <h3>Job description:</h3> {jobData.description}
                        </p>

                    </div>
                    <Button variant="warning"
                    >
                        <Link to="/JobListing">Back</Link>
                    </Button>

                    <button onClick={save_to_fav} type="button" class="btn btn-warning">Add to Favorite</button>

                </div>
            </div>
        </div >
    );
}

export default JobDiscription;