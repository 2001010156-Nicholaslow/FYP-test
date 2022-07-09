import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './YouthLogin.css';
import Axios from "axios";
import validator from "validator";
import { Form, Alert } from 'react-bootstrap';

export default function Login() {

    const nav = useNavigate();
    const [password, Setpassword] = useState("");
    const [email, Setemail] = useState("");
    const [LoginMSG, SetLoginMSG] = useState("");
    const [LoginStatus, SetLoginStatus] = useState(false);

    var sess;
    //module.exports = {sess};
    Axios.defaults.withCredentials = true; //must be true

    const login = () => {
        if (
            !validator.isEmpty(email) &
            !validator.isEmpty(password)
        ) {
            Axios.post("http://localhost:3001/Useremailverifycheck", {
                email: email
            }).then((res) => {
                if (res.data.message) {
                    SetLoginMSG(res.data.message)
                    SetLoginStatus(true)
                } else {
                    Axios.post("http://localhost:3001/ClientLogin", {
                        email: email,
                        password: password
                    }).then((response) => {

                        if (!response.data.auth) {
                            SetLoginStatus(true)
                            SetLoginMSG("Invalid Password/Email")
                        } else {
                            localStorage.setItem("token", response.data.token)
                            sess = response.data.result[0]
                            localStorage.setItem("Uid", sess.user_id)
                            nav("../")



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
            })
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
                SetLoginStatus(false)
            }
        })
    }, [])


    return (
        <div className='container_loginPage1'>
            {LoginStatus && <Alert variant="warning" >{LoginMSG}</Alert>}
            <div className='Login_container'>
                <div classname='login'>
                    <div className='header'>
                        <h3 className='headertext'>Youth Login</h3>
                        <p>Find the right job with us</p>
                        <hr className='hr'></hr>
                    </div>
                    <Form>
                        <input classname="login_box" type="email" onChange={(e) => { Setemail(e.target.value) }} placeholder="Email" style={{ marginTop: 10 }} required />
                        <br></br>
                        <input type="password" classname="login_box" placeholder="Password" onChange={(e) => { Setpassword(e.target.value) }} style={{ marginTop: 10 }} required />
                        <br></br>
                    </Form>
                </div>
                <button className='login_button' type="submit" onClick={login} style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }} >Login</button>
                <p>Not a Youth <Link to="../Register/YouthRegister">Sign up here</Link>?</p>
            </div>
        </div>

    );
}