import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';


class YouthDetails3 extends Component{

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
                    <Form>
                        <Form.Group controlId="formCitizenship" style={{ marginTop: 10}}>
                            <Form.Label>Citizenship</Form.Label>
                                <Form.Control as="select" name="citizenship" defaultValue={this.props.inputValues.citizenship} onChange={this.props.handleChange}>
                                    <option selected disabled value="">Please select a option</option>
                                    <option value="Singaporean">Singaporean</option>
                                    <option value="PR">Permanent Resident</option>
                                    <option value="Others">Others</option>
                                </Form.Control>
                        </Form.Group>
                        

                        
                        <Form.Group controlId="formAddress" style={{ marginTop: 10}}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.address}
                                name="address"
                                required
                                onChange={this.props.handleChange}
                            />
                        </Form.Group>

                            <Form.Group controlId="formCountry" style={{ marginTop: 10}}>
                                <Form.Label>Country</Form.Label>
                                <Form.Control as="select" name="country" defaultValue={this.props.inputValues.country} onChange={this.props.handleChange}>
                                    <option selected disabled value="">Please choose a country</option>
                                    <option value="SG">Singapore</option>
                                    <option value="ML">Malaysia</option>
                                    <option value="KR">Korea</option>
                                    <option value="JP">Japan</option>
                                    <option value="SK">South Korea</option>
                                    <option value="LK">Sri Lanka</option>
                                    <option value="IN">India</option>
                                    <option value="ID">Indonesia</option>
                                    <option value="PH">Philippines</option>
                                    <option value="USA">USA</option>
                                    <option value="EU">Europe</option>
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group controlId="formPostalcode" style={{ marginTop: 10}}>
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.postalcode}
                                name="postalcode"
                                required
                                onChange={this.props.handleChange}
                                />
                            </Form.Group>

                        <Button variant="secondary" onClick={this.back} style={{ marginTop: 25}}>Back</Button>{' '}
                        <Button variant="primary" onClick={this.saveAndContinue} style={{ marginTop: 25}}>Next</Button>
                    </Form>
                </Container>
        );
    }
}

export default YouthDetails3;