import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import NavbarComp from "../Components/NavBar/NavbarComp";
import Button from 'react-bootstrap/Button';
import Axios from "axios";


function JobDetails() {

    const Dlocation = useLocation();
    const search = Dlocation.state;
    const UDetails = search + '';

    const [jobName, SetjobName] = useState("");
    const [jobCName, SetjobCName] = useState("");
    const [jobPLevel, SetPLevel] = useState("");
    const [jobY, SetjobY] = useState("");
    const [jobScope, SetjobScope] = useState("");
    const [jobIndustry, SetjobIndustry] = useState("");
    const [jobDesc, SetjobDesc] = useState("");
    const [jobLoc, SetjobLoc] = useState("");
    const [jobSalary, SetjobSalary] = useState("");
    const [jobQ, SetjobQ] = useState("");
    const [jobA, SetjobA] = useState("");
    const [jobDate, SetjobDate] = useState("");

    useEffect(() => {
        Axios.post('http://localhost:3001/getjobdetails', {
            opp_id: UDetails
        }).then((response) => {
            SetjobName(response.data[0].name)
            console.log(response);
        });
    },[]);
    return (
        <div>
            <div>
                <NavbarComp />
            </div>
            <div class="container p-5 my-5 bg-dark  text-white">
                <Button variant="warning">
                    <Link to="../company/PartnersPage" state={UDetails}>Back</Link>
                </Button>
                <h4 className="mb-3"> Name: {jobName}</h4>
                <p>
                    Company Name: {jobCName}
                </p>
                <p>
                    Job Position: {jobPLevel}
                </p>
                <p>
                    Location: {jobLoc}
                </p>
                <p>
                    ID: {UDetails}
                </p>
                <p>
                    Years to serve: {jobY}
                </p>
                <p>
                    Industry for {jobCName}: {jobIndustry}
                </p>
                <p>
                    Job salary for {jobCName}: ${jobSalary}
                </p>
                <p>
                    Job qualification for {jobCName}: {jobQ}
                </p>
                <p>
                    Any Additional requirements: {jobA}
                </p>
                <p>
                    _____________________________________________________________________________________________________________________________
                </p>
                <div class="row">
                    <div class="col-sm-6">
                        <p>
                            <h3>Socpe for {jobCName}:</h3> {jobScope}
                        </p>
                    </div>
                    <div class="col-sm-6">
                        <p>
                            <h3>Job description:</h3> {jobDesc}
                        </p>

                    </div>

                </div>
            </div>
        </div >
    );
}

export default JobDetails;