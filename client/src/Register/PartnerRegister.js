import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import validator from "validator";
import Axios from "axios";

class PartnerRegister extends Component {



  state = {
      email: '',
      fullname: '',
      num: '',
      businessname: '',
      password: '',
    }
  

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
  }

  saveAndContinue = (e) => {
    if (
        !validator.isEmpty(this.props.inputValues.email) &
        validator.isEmail(this.props.inputValues.email) &
        !validator.isEmpty(this.props.inputValues.fullname) &
        !validator.isEmpty(this.props.inputValues.num) &
        //validator.isLength(this.props.inputValues.num, {min:8}) &
        !validator.isEmpty(this.props.inputValues.businessname) &
        !validator.isEmpty(this.props.inputValues.password)
        //validator.isLength(this.props.inputValues.password, { min: 8 })

    ) {
        e.preventDefault();
        Axios.post('http://localhost:3001/PartnerConfirmation' , {
          email: this.props.inputValues.email,
          businessname : this.props.inputValues.businessname,
          fullname : this.props.inputValues.fullname,
          num : this.props.inputValues.num,
          password : this.props.inputValues.password
    }).then((Response) => {
            console.log(Response)
        })
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

  register = (e) =>{
    e.preventDefault()
    console.log(this.state)
    Axios.post('http://localhost:3001/PartnerConfirmation' , this.state).then((Response) => {
        console.log(Response)
    })
}

  render() {
    const {email, businessname, fullname, num, password} = this.state
    return (
      <Container>
        <h1>Partner Register page</h1>
        <br></br>
        <Form>
          <Form.Group controlId="formEmail" style={{ marginTop: 10 }} >
            <Form.Label className="label">Email Address</Form.Label>
            <Form.Control style={{ width: 300 }}
              type="email"
              value={email}
              name="email"
              required
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formFullName" style={{ marginTop: 10 }}>
            <Form.Label className="label">Contact Person Name</Form.Label>
            <Form.Control
              type="text"
              value={fullname}
              name="fullname"
              required
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formNum" style={{ marginTop: 10 }}>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="number"
              value={num}
              name="num"
              required
              minlength={8}
              min={0}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBusinessName" style={{ marginTop: 10 }}>
            <Form.Label className="label">Registered Business Name</Form.Label>
            <Form.Control
              type="text"
              //pattern="[0-9]{5}"
              value={businessname}
              name="businessname"
              required
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" style={{ marginTop: 10 }}>
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              name="password"
              required
              minlength={8}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" onClick={this.register} style={{ marginTop: 25, marginLeft: 120 }}>Next</Button>
          
        </Form>

        <Link to="../Login/login" style={{ marginTop: 20 }}>Already a Partner?</Link>

      </Container>
    );
  }
}

export default PartnerRegister;