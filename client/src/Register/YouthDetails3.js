import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import validator from "validator";

class YouthDetails3 extends Component {

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        if (
            !validator.isEmpty(this.props.inputValues.citizenship) &
            !validator.isEmpty(this.props.inputValues.address) &
            !validator.isEmpty(this.props.inputValues.levelOfEducation) &
            !validator.isEmpty(this.props.inputValues.country) &
            !validator.isEmpty(this.props.inputValues.postalcode) &
            validator.isInt(this.props.inputValues.postalcode) &
            validator.isPostalCode(this.props.inputValues.postalcode, 'SG')
        ) {
            e.preventDefault();
            this.props.nextStep();
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
    };


    render() {
        return (
            <Container>
                <h1>Personal Details</h1>
                <Form>
                    <Form.Group controlId="formCitizenship" style={{ marginTop: 10 }}>
                        <Form.Label>Citizenship</Form.Label>
                        <Form.Control as="select" name="citizenship" defaultValue={this.props.inputValues.citizenship} onChange={this.props.handleChange} required style={{ width: 300 }}>
                            <option selected disabled value="">Please select a option</option>
                            <option value="Singaporean">Singaporean</option>
                            <option value="PR">Permanent Resident</option>
                            <option value="Others">Others</option>
                        </Form.Control>
                    </Form.Group>



                    <Form.Group controlId="formAddress" style={{ marginTop: 10 }}>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            defaultValue={this.props.inputValues.address}
                            name="address"
                            required
                            onChange={this.props.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formCountry" style={{ marginTop: 10 }}>
                        <Form.Label>Country</Form.Label>
                        <Form.Control as="select" name="country" defaultValue={this.props.inputValues.country} onChange={this.props.handleChange} required>
                            <option selected disabled value="">Please choose a country</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Korea">Korea</option>
                            <option value="Japan">Japan</option>
                            <option value="South Korea">South Korea</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Philippines">Philippines</option>
                            <option value="USA">USA</option>
                            <option value="EU">Europe</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPostalcode" style={{ marginTop: 10 }}>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            pattern="[0-9]*"
                            defaultValue={this.props.inputValues.postalcode}
                            name="postalcode"
                            required minLength={6}
                            maxLength="6"
                            onChange={this.props.handleChange}
                        />
                    </Form.Group>

                    <Button variant="secondary" onClick={this.back} style={{ marginTop: 25, marginLeft : "25%" }}>Back</Button>{' '}
                    <Button type="submit" variant="primary" onClick={this.saveAndContinue} style={{ marginTop: 25 }}>Next</Button>
                </Form>
            </Container>
        );
    }
}

export default YouthDetails3;