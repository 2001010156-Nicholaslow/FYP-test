import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './YouthLogin.css';
import Axios from "axios";
import validator from "validator";
import { Form, Alert } from 'react-bootstrap';
import Popup from '../Partner/Popup';
import '../Partner/Popup.css';

function ForgetPasswordPartner() {

    const nav = useNavigate();
    const [email, Setemail] = useState("");
    const [LoginMSG, SetLoginMSG] = useState("");
    const [LoginStatus, SetLoginStatus] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    var sess;
    //module.exports = {sess};
    Axios.defaults.withCredentials = true; //must be true

    const togglePopup = () => {
        setIsOpen(!isOpen);
        nav("../Login/PartnerLogin")
    }

    
    const resetPS = () => {
        if (
            !validator.isEmpty(email)
        ) {
            Axios.post("http://localhost:3001/Partneremailverifycheck", {
                email: email
            }).then((res) => {
                if (res.data.message) {
                    SetLoginMSG("This email does not exist.")
                    SetLoginStatus(true)
                } else {
                    Axios.post("http://localhost:3001/PartnerPasswordForget", {
                        email: email,
                    }).then((response) => {
                        nav("../")
                    });
                    SetLoginStatus(false)
                    setIsOpen(true)
                }
            })
        } else {

            var required = document.querySelectorAll("input[required]");

            required.forEach(function (element) {
                if (element.value.trim() === "") {
                    element.style.borderColor = "#f10";
                    SetLoginMSG("Invalid Email")
                    SetLoginStatus(true)

                } else {
                    element.style.borderColor = "white";
                }
            });

        }
    };

    return (
        <div className='container_loginPage1'>
            <div className='Login_container'>
            {LoginStatus && <Alert variant="warning" >{LoginMSG}</Alert>}
                <div classname='login'>
                    <div className='header'>
                        <h3 className='headertext'>Reset Password</h3>
                        <hr className='hr'></hr>
                    </div>
                    <Form>
                        <input classname="login_box" type="email" onChange={(e) => { Setemail(e.target.value) }} placeholder="Email" style={{ marginTop: 10 }} required />
                        <br></br>
                    </Form>
                </div>
                <button className='login_button' type="submit" onClick={resetPS} style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }} >Reset Password</button>
                <p>Not a Partner <Link to="../Register/PartnerRegister">Sign up here</Link>?</p>
            </div>
            {isOpen && <Popup
                content={<>
                    <h2>An email has been send to your email</h2>
                    <p>Please check your email to reset your password.</p>
                </>}
                handleClose={togglePopup}
            />}
        </div>

    );
}
export default ForgetPasswordPartner;