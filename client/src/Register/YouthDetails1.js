import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import validator from "validator";
import NavbarComp from "../Components/NavBar/NavbarComp";
import Axios from "axios";
import './YouthRegister.css';

class YouthDetails1 extends Component {


    state = {
        LoginStatus: ""
    };



    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }


    checkEmail = (e) => {
        if (
            !validator.isEmpty(this.props.inputValues.email) &
            validator.isEmail(this.props.inputValues.email) &
            !validator.isEmpty(this.props.inputValues.fullname) &
            !validator.isEmpty(this.props.inputValues.password) &
            validator.isLength(this.props.inputValues.password, { min: 8 })

        ) {
            e.preventDefault();
            Axios.post("http://localhost:3001/EmailCheck", {
                email: this.props.inputValues.email
            }).then((response) => {
                if (response.data.message) {
                    this.setState({ LoginStatus: "Email Valid" })
                    this.props.nextStep();


                } else {
                    this.setState({ LoginStatus: "This email is already in used. Try another Email." })

                    //alert("This email is already in used. Try another Email.");
                }
            });
        } else {

            var required = document.querySelectorAll("input[required]");

            required.forEach(function (element) {
                if (element.value.trim() === "") {
                    element.style.borderColor = "#f10";
                } else {
                    element.style.borderColor = "white";
                }
            });

        }
    }


    render() {
        return (
            <div>

                <div>
                    <NavbarComp />
                </div>

                <div className="pageRegister">
                    <div className="page2R">

                        <h1>Youth Register page</h1>
                        <p style={{ marginTop: 10, color: 'red' }}>{this.state.LoginStatus}</p>
                        <Form>
                            <Form.Group controlId="formEmail" style={{ marginTop: 10 }} >
                                <Form.Label className="label">Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    defaultValue={this.props.inputValues.email}
                                    name="email"
                                    required
                                    onChange={this.props.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formFullName" style={{ marginTop: 10 }}>
                                <Form.Label className="label">Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={this.props.inputValues.fullname}
                                    name="fullname"
                                    required
                                    onChange={this.props.handleChange}
                                />
                            </Form.Group>


                            <Form.Group controlId="formPassword" style={{ marginTop: 10 }}>
                                <Form.Label className="label">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    defaultValue={this.props.inputValues.password}
                                    name="password"
                                    required
                                    minlength="8"
                                    onChange={this.props.handleChange}
                                />
                                <small id="passwordHelpInline" class="text-muted">
                                    Must be 8-20 characters long.
                                </small>
                            </Form.Group>

                            <Button type="submit" variant="primary" onClick={this.checkEmail} style={{ marginTop: 25, marginLeft: "40%" }}>Next</Button>

                        </Form>

                        <Link to="../Login/login" style={{ marginTop: 20, marginLeft: "30%" }}>Already a Youth?</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default YouthDetails1;