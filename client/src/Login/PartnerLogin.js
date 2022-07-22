import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './YouthLogin.css';
import Axios from "axios";
import validator from "validator";
import { Form, Alert } from 'react-bootstrap';
import NavbarComp from "../Components/NavBar/NavbarComp";

function PartnerLogin() {

    const nav = useNavigate();
    const [password, Setpassword] = useState("");
    const [email, Setemail] = useState("");
    const [LoginMSG, SetLoginMSG] = useState("");
    const [LoginStatus, SetLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true; //must be true

    var sess;

    const login = () => {
        //clear storage
        localStorage.clear()
        sessionStorage.clear()
        if (
            !validator.isEmpty(email) &
            !validator.isEmpty(password) &
            email === "admin" & 
            password === "admin"

        ) {
            SetLoginMSG("admin login")
            SetLoginStatus(true)
            //nav("")  //change to admin login page


        } else if(!validator.isEmpty(email) & !validator.isEmpty(password) ){
            SetLoginMSG("admin login")
                    SetLoginStatus(true)
                    Axios.post("http://localhost:3001/Partneremailverifycheck", {
                email: email
            }).then((res) => {
                if (res.data.message) {
                    SetLoginMSG(res.data.message)
                    SetLoginStatus(true)
                } else {
                    Axios.post("http://localhost:3001/PartnerLogin", {
                        email: email,
                        password: password
                    }).then((response) => {
                        if (!response.data.auth) {
                            SetLoginStatus(true)
                            SetLoginMSG("Invalid Password/Email")
                        } else {
                            localStorage.setItem("token", response.data.token)
                            sess = response.data.result[0]
                            localStorage.setItem("user_id", sess.partners_id)
                            nav("../Partner/Partner")

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
                }
            });

        } else {

            var required = document.querySelectorAll("input[required]");

            required.forEach(function (element) {
                if (element.value.trim() === "") {
                    element.style.borderColor = "#f10";
                    SetLoginMSG("Invalid Password/Email")
                    SetLoginStatus(true)

                } else {
                    element.style.borderColor = "white";
                }
            });

        }
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/loginSession").then((response) => {
            if (response.data.loggedIn == true) {
                SetLoginStatus(false)
            }
        })
    }, [])


    return (
        <div>
<div>
      <NavbarComp />
    </div>
        
        <div className='container_loginPage1'>
            <div className='Login_container'>
            {LoginStatus && <Alert variant="warning" >{LoginMSG}</Alert>}
                <div classname='login'>
                    <div className='header'>
                        <h3 className='headertext_2'>Partner Login</h3>
                        
                        <hr className='hr'></hr>
                    </div>

                    <Form>
                        <input classname="login_box" type="email" onChange={(e) => { Setemail(e.target.value) }} placeholder="Email" style={{ marginTop: 10 }} required />
                        <br></br>
                        <input type="password" classname="login_box" placeholder="Password" onChange={(e) => { Setpassword(e.target.value) }} style={{ marginTop: 10 }} required />
                        <p><Link to="../Login/ForgetPasswordPartner">Forget Password?</Link></p>
                        
                    </Form>
                </div>
                <button className='login_button' type="submit" onClick={login} style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }} >Login</button>
                <p>Want to be a Partner? <Link to="../Register/PartnerRegister">Sign up here</Link></p>

            </div>
        </div>
</div>
    );
}
export default PartnerLogin;