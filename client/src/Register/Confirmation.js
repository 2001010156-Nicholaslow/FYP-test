import React, { Component } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import Axios from "axios";
import './Confirmation.css';

class Confirmation extends Component{

    

    Youthregister = (e) =>{
        Axios.post('http://localhost:3001/YouthConfirmation' , {
            email: this.props.inputValues.email,
            fullname : this.props.inputValues.fullname,
            password : this.props.inputValues.password,
            dob : this.props.inputValues.dob,
            gender : this.props.inputValues.gender,
            num : this.props.inputValues.num,
            levelOfEducation : this.props.inputValues.levelOfEducation,
            citizenship : this.props.inputValues.citizenship,
            address : this.props.inputValues.address,
            country : this.props.inputValues.country,
            postalcode : this.props.inputValues.postalcode
          
        }).then((Response) => {
            window.location.replace("../Login/Login");
        })
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    render(){
        const {inputValues: { email, fullname, password, dob, gender, num, levelOfEducation, citizenship, address, country, postalcode }} = this.props;

        return(
            <Container className='card1'>
                <h1>Confirm your Details</h1>
                <p>Confirm if the following details are correct.</p>
                
                <Card className='details'>
                    <Card.Body className='card2'>
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
                <Button variant="secondary" onClick={this.back} className='button'>Back</Button>{' '}
                <Button variant="primary" onClick={this.Youthregister} className='button'>Confirm</Button>
            </Container>
        )
    }
}

export default Confirmation;