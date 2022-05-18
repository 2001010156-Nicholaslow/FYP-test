import React, { Component } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import './Confirmation.css';

class Confirmation extends Component{

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
            <Container classname='card1'>
                <h1>Confirm your Details</h1>
                <p>Confirm if the following details are correct.</p>
                
                <Card classname='card1'>
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
                <Button variant="secondary" onClick={this.back} style={{ marginTop: 10}}>Back</Button>{' '}
                <Button variant="primary" style={{ marginTop: 10}}>Confirm</Button>
            </Container>
        )
    }
}

export default Confirmation;