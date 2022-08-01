import React, { Component } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import NavbarComp from "../Components/NavBar/NavbarComp";
import Axios from "axios";
import './YouthRegister.css';
import './Confirmation.css';

class Confirmation extends Component {



    Youthregister = (e) => {
        Axios.post('http://localhost:3001/YouthConfirmation', {
            email: this.props.inputValues.email,
            fullname: this.props.inputValues.fullname,
            password: this.props.inputValues.password,
            dob: this.props.inputValues.dob,
            gender: this.props.inputValues.gender,
            num: this.props.inputValues.num,
            levelOfEducation: this.props.inputValues.levelOfEducation,
            citizenship: this.props.inputValues.citizenship,
            address: this.props.inputValues.address,
            country: this.props.inputValues.country,
            postalcode: this.props.inputValues.postalcode

        }).then((response) => {
            window.location.href = "../success";
        }, (error) => {
            console.log(error);
        })
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const { inputValues: { email, fullname, password, dob, gender, num, levelOfEducation, citizenship, address, country, postalcode } } = this.props;

        return (
            <div>
                <div>
                    <NavbarComp />
                </div>

                <div className="pageRegister">
                    <h1>Confirm your Details</h1>
                    <p>Confirm that the following details are correct.</p>

                    <div className="page2R">
                        <Card style={{ backgroundColor: "#282c34" }}>
                            <Card.Body>
                                <p>Email : {email}</p>
                                <p>Full Name : {fullname}</p>
                                <p>Password : {password}</p>
                                <p>Date of Birth : {dob}</p>
                                <p>Adress : {address}</p>
                                <p>Gender : {gender}</p>
                                <p>Contact Number : {num}</p>
                                <p>Highest Level Of Education : {levelOfEducation}</p>
                                <p>Citizenship : {citizenship}</p>
                                <p>Address : {address}</p>
                                <p>Country : {country}</p>
                                <p>Postal Code : {postalcode}</p>
                            </Card.Body>
                        </Card>
                        <Button variant="secondary" style={{ marginLeft : "30%"}}onClick={this.back} className='button'>Back</Button>{' '}
                        <Button variant="primary" onClick={this.Youthregister} className='button'>Confirm</Button>

                    </div>
                </div>
            </div>


        )
    }
}

export default Confirmation;