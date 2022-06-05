import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './YouthLogin.css';
import Axios from "axios";
import validator from "validator";
import { Form } from 'react-bootstrap';

function PartnerLogin() {

    const [password, Setpassword] = useState("");
    const [email, Setemail] = useState("");
    const [LoginMSG, SetLoginMSG] = useState("");
    const [LoginStatus, SetLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true; //must be true

    const login = () => {
        if (
            !validator.isEmpty(email) &
            !validator.isEmpty(password)

        ) {
            Axios.post("http://localhost:3001/PartnerLogin", {
                email: email,
                password: password
            }).then((response) => {

                if (!response.data.auth) {
                    SetLoginMSG(false)
                    SetLoginMSG("Invalid Password/Email")
                } else {
                    localStorage.setItem("token", response.data.token)
                    SetLoginMSG(true)
                    SetLoginMSG("Login Success")

                    //check auth
                    Axios.get("http://localhost:3001/isAuth", {
                        headers: {
                            "x-access-token": localStorage.getItem("token"),
                        },
                    }).then((response) => {
                        console.log(response);
                    });
                }
            });
        } else {

            var required = document.querySelectorAll("input[required]");

            required.forEach(function (element) {
                if (element.value.trim() === "") {
                    element.style.borderColor = "#f10";
                    SetLoginMSG("Invalid Password/Email")

                } else {
                    element.style.borderColor = "white";
                }
            });

        }
    };

    /*const userAuthenticated = () => { //check for correct token
        Axios.get("http://localhost:3001/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            console.log(response);
        });
    }*/

    useEffect(() => {
        Axios.get("http://localhost:3001/loginSession").then((response) => {
            if (response.data.loggedIn == true) {
                SetLoginStatus(true)
            }

        })
    })


    return (
        <div className='container'>
            <div classname='login'>
                <div className='header'>
                    <h3 className='headertext'>Partner Login</h3>
                    <hr className='hr'></hr>
                </div>
                <Form>
                    <input classname="login_box" type="email" onChange={(e) => { Setemail(e.target.value) }} placeholder="Email" style={{ marginTop: 10 }} required />
                    <br></br>
                    <input type="password" classname="login_box" placeholder="Password" onChange={(e) => { Setpassword(e.target.value) }} style={{ marginTop: 10 }} required />
                    <br></br>
                </Form>
            </div>
            <button type="submit" onClick={login} style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }} >Login</button>
            <p>Want to be a Partner? <Link to="../Register/PartnerRegister">Sign up here</Link></p>
            <h1>{LoginMSG}</h1>
        </div>

    );
}
export default PartnerLogin;