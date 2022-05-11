import React from "react";
import {Link} from "react-router-dom";

function Login(){
    return(
        <div className="Login">
            <h1>This is the login page</h1>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button>Login</button>
            
            <ul>
            <li><Link to="/">Home</Link></li>
            </ul>
        </div>
    );
}
// delete all of this
export default Login;