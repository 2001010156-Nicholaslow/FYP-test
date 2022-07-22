import React, { useEffect, useState } from "react";
import NavbarComp from "./Components/NavBar/NavbarComp";


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
    return (
        <div>
            <div>
                <NavbarComp />
            </div>
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
                Socpe for {jobData.name}: {jobData.job_scope}
            </p>
            <p>
                Job description: {jobData.description}
            </p>
        </div>
    );
}

export default JobDiscription;