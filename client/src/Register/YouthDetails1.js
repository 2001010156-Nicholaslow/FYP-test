import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';



class YouthDetails1 extends Component{
    

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault(); 
        this.props.nextStep();
    };


    render() {
        return( <Container>
            <h1>This is the Youth Register page</h1>
            <br></br>
                    <Form>
                        <Form.Group controlId="formEmail" style={{ marginTop: 10}} required >
                                <Form.Label className="label">Email Address</Form.Label>
                                <Form.Control
                                type="email"
                                defaultValue={this.props.inputValues.email}
                                name="email"
                                required
                                onChange={this.props.handleChange}
                                />
                        </Form.Group>

                        <Form.Group controlId="formFullName" style={{ marginTop: 10}}>
                                <Form.Label className="label">Full Name</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.fullname}
                                name="fullname"
                                required
                                onChange={this.props.handleChange}
                            />
                        </Form.Group>
                        

                        <Form.Group controlId="formPassword" style={{ marginTop: 10}}>
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control
                            type="password"
                            defaultValue={this.props.inputValues.password}
                            name="password"
                            required
                            onChange={this.props.handleChange}
                            />
                        </Form.Group>
                        
                        <Button type="submit" variant="primary" onClick={this.saveAndContinue} style={{ marginTop: 25}}>Next</Button>

                    </Form>
                    
                    <Link to="../login" style={{ marginTop: 20}}>Already a Youth?</Link>
                    
                </Container>
        );
    }
}

export default YouthDetails1;