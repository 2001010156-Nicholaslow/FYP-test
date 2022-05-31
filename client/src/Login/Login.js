import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './YouthLogin.css';
import Axios from "axios";
import validator from "validator";

function Login() {

    const [password, Setpassword] = useState("");
    const [email, Setemail] = useState("");
    const [LoginStatus, SetLoginStatus] = useState("");

    const login = () => {
        if (
            !validator.isEmpty(email) &
            !validator.isEmpty(password)

        ) {
            Axios.post("http://localhost:3001/ClientLogin", {
                email: email,
                password: password
            }).then((response) => {

                if (response.data.message) {
                    SetLoginStatus(response.data.message)
                } else {
                    SetLoginStatus("Login Successfully")
                }
            });
        } else {

            var required = document.querySelectorAll("input[required]");

            required.forEach(function (element) {
                if (element.value.trim() === "") {
                    element.style.backgroundColor = "#ffcccb";
                } else {
                    element.style.backgroundColor = "white";
                }
            });

        }
    };


    return (
        <div className='container'>
            <div className='header'>
                <h3 className='headertext'>Youth Login</h3>
                <p>Find the right job with us</p>
                <hr className='hr'></hr>
            </div>

            <input classname="login_box" type="email" onChange={(e) => { Setemail(e.target.value) }} placeholder="Email" style={{ marginTop: 10 }} required />

            <input type="password" classname="login_box" placeholder="Password" onChange={(e) => { Setpassword(e.target.value) }} style={{ marginTop: 10 }} required />
            <button type="submit" onClick={login} style={{ marginTop: 10 }} >Login</button>
            <Link to="../Register/YouthRegister">Sign up here</Link>

            <h1>{LoginStatus}</h1>
        </div>

    );
}
export default Login;