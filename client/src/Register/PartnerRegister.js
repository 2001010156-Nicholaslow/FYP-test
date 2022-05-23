import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import validator from "validator";

class PartnerRegister extends Component {

  state = {
    email: '',
    fullname: '',
    num: '',
    businessname: '',
    password: '',
  }

  render() {
    return (
      <Container>
        <h1>Partner Register page</h1>
        <br></br>
        <Form>
          <Form.Group controlId="formEmail" style={{ marginTop: 10 }} >
            <Form.Label className="label">Email Address</Form.Label>
            <Form.Control style={{ width: 300 }}
              type="email"
              defaultValue=""
              name="email"
              required
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formFullName" style={{ marginTop: 10 }}>
            <Form.Label className="label">Contact Person Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              name="fullname"
              required
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formNum" style={{ marginTop: 10 }}>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="number"
              defaultValue=""
              name="num"
              required
              minlength={8}
              min={0}
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBusinessName" style={{ marginTop: 10 }}>
            <Form.Label className="label">Registered Business Name</Form.Label>
            <Form.Control
              type="text"
              //pattern="[0-9]{5}"
              defaultValue=""
              name="businessname"
              required
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" style={{ marginTop: 10 }}>
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              type="password"
              defaultValue=""
              name="password"
              required
              minlength={8}
              onChange={this.props.handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" onClick={this.saveAndContinue} style={{ marginTop: 25, marginLeft: 120 }}>Next</Button>

        </Form>

        <Link to="../Login/login" style={{ marginTop: 20 }}>Already a Partner?</Link>

      </Container>
    );
  }
}

export default PartnerRegister;