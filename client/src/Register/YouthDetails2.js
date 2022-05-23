import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import validator from "validator";

class YouthDetails2 extends Component{

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        if(
            !validator.isEmpty(this.props.inputValues.dob) &
            !validator.isEmpty(this.props.inputValues.gender) &
            !validator.isEmpty(this.props.inputValues.num) &
            !validator.isEmpty(this.props.inputValues.levelOfEducation)
        ){
            e.preventDefault();
            this.props.nextStep();
        }
    };


    render() {
        return( 
        <Container>
                    <Form>
                        <Form.Group controlId="formDOB" style={{ marginTop: 10}}>
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control style={{ width: 300}}
                                type="date"
                                defaultValue={this.props.inputValues.dob}
                                name="dob"
                                required
                                onChange={this.props.handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGender" style={{ marginTop: 10}}>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" name="gender" defaultValue={this.props.inputValues.gender} onChange={this.props.handleChange} required>
                                    <option selected disabled value="">Please select a option</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formNum" style={{ marginTop: 10}}>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type="number"
                                defaultValue={this.props.inputValues.num}
                                name="num"
                                required minLength={8}
                                min = "0"
                                onChange={this.props.handleChange}
                            />
                        </Form.Group>


                        <Form.Group controlId="formlevelOfEducation" style={{ marginTop: 10}}>
                            <Form.Label>Highest Level Of Education</Form.Label>
                            <Form.Control as="select" name="levelOfEducation" defaultValue={this.props.inputValues.levelOfEducation} onChange={this.props.handleChange} required>
                                    <option selected disabled value="">Please select a option</option>
                                    <option value="O-level">GCE 'O' Level</option>
                                    <option value="N-level">GCE 'N' Level</option>
                                    <option value="A-level">GCE 'A' Level</option>
                                    <option value="Diploma">Diploma/Degree</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Master">Master</option>
                                    <option value="Others">Others</option>
                                    </Form.Control>
                        </Form.Group>
                        

                        <Button variant="secondary" onClick={this.back} style={{ marginTop: 25}}>Back</Button>{' '}
                        <Button type = "submit" variant="primary" onClick={this.saveAndContinue} style={{ marginTop: 25}}>Next</Button>
                    </Form>
                </Container>
        );
    }
}

export default YouthDetails2;