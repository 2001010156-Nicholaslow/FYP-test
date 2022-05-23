import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import validator from "validator";

class YouthDetails1 extends Component {


    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }



    saveAndContinue = (e) => {
        if (
            !validator.isEmpty(this.props.inputValues.email) &
            validator.isEmail(this.props.inputValues.email) &
            !validator.isEmpty(this.props.inputValues.fullname) &
            !validator.isEmpty(this.props.inputValues.password) &
            validator.isLength(this.props.inputValues.password, { min: 8 })

        ) {
            e.preventDefault();
            this.props.nextStep();
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


    render() {
        return (
        <Container>
            <h1>This is the Youth Register page</h1>
            <br></br>
            <Form>
                <Form.Group controlId="formEmail" style={{ marginTop: 10 }} >
                    <Form.Label className="label">Email Address</Form.Label>
                    <Form.Control style={{ width: 300 }}
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
                </Form.Group>

                <Button type="submit" variant="primary" onClick={this.saveAndContinue} style={{ marginTop: 25, marginLeft: 120}}>Next</Button>

            </Form>
    
            <Link to="../Login/login" style={{ marginTop: 20 }}>Already a Youth?</Link>

        </Container>
        );
    }
}

export default YouthDetails1;