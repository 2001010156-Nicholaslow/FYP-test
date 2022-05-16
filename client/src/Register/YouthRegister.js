import React, { useState } from "react";
import {Link} from "react-router-dom";

function YouthRegister(){

    const [usernameReg, setusernameReg] = useState('')
    const [passwordReg, setpasswordReg] = useState('')
    const [emailReg, setemailReg] = useState('')


    return(
        <div className="YouthRegister">
            <h1>This is the Youth Register page</h1>

            <input type="text" placeholder="Full name" onChange={(e) => {setusernameReg(e.target.value)}}/>
            <input type="text" placeholder="Email" onChange={(e) => {setpasswordReg(e.target.value)}}/>
            <input type="password" placeholder="Password" onChange={(e) => {setemailReg(e.target.value)}}/>
            <button>Login</button>

            <ul><li><Link to="/Register/partnerRegister">Register for partners</Link></li></ul>
        </div>
    );
}

export default YouthRegister;