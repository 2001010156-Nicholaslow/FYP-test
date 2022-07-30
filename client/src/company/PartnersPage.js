import React from "react";
import NavbarComp from "../Components/NavBar/NavbarComp";
import Axios from "axios";



function PartnersPage(){
    // useEffect(() => {
    //     Axios.get("http://localhost:3001/admin_get_opp", {
    //       headers: {
    //         "x-access-token": localStorage.getItem("token"),
    //       },
    //     }).then((response) => {
    //       setJobData(response.data);
    //       window.localStorage.setItem("jobData", JSON.stringify(response.data));
    //       console.log(jobData);
    //       console.log(response);
    //     });
    //   }, []);
    return(
        <div>
            <div>
      <NavbarComp />
    </div>
            <h1>PartnersPage</h1>
        </div>
    );
}
// delete all of this
export default PartnersPage;