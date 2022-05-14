import React from "react";
import {Link} from "react-router-dom";

function YouthRegister(){
    return(
        <div className="YouthRegister">
            <h1>This is the Youth Register page</h1>

            <input type="text" placeholder="Full name"/>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button>Login</button>

            <ul><li><Link to="/Register/partnerRegister">Register for partners</Link></li></ul>
        </div>
    );
}
// delete all of this
export default YouthRegister;