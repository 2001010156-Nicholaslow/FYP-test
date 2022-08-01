import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap';
import validator from "validator";
import NavbarComp from "../Components/NavBar/NavbarComp";
import Axios from "axios";
import './YouthRegister.css';

class PartnerRegister extends Component {

  state = {
    email: '',
    fullname: '',
    num: '',
    businessname: '',
    password: '',
    LoginStatus: '',
    regexNum :  /\+65[6|8|9]\d{7}/,
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  saveAndContinue = (e) => {
    if (
      !validator.isEmpty(this.state.email) &
      validator.isEmail(this.state.email) &
      !validator.isEmpty(this.state.fullname) &
      !validator.isEmpty(this.state.num) &
      !validator.isEmpty(this.state.businessname) &
      !validator.isEmpty(this.state.password) &
      this.state.num.match(/[6|8|9][0-9]{7}/) !== null

    ) {
      console.log(this.state.num.match(/[6|8|9][0-9]{7}/))

      e.preventDefault();
      //console.log(this.state)
      Axios.post("http://localhost:3001/EmailCheck1", {
        email: this.state.email
      }).then((response) => {
        if (response.data.message) {
          Axios.post('http://localhost:3001/PartnerConfirmation', this.state).then((Response) => {
            this.setState({ LoginStatus: "Account successfully created!" })
          })
          window.location.replace("../success");
        } else {
          this.setState({ LoginStatus: "This email is already in used. Try another Email." })

          //alert("This email is already in used. Try another Email.");
        }
      });
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
  }


  register = (e) => {
    e.preventDefault()
    console.log(this.state)
    Axios.post('http://localhost:3001/PartnerConfirmation', this.state).then((Response) => {
      console.log(Response)
    })
  }

  render() {
    const { email, businessname, fullname, num, password, LoginStatus } = this.state
    return (
      <div>

        <div>
          <NavbarComp />
        </div>

        <div className="pageRegister">
          <div className="page2R">

            <h1>Partner Register page</h1>
            <p style={{ marginTop: 10, color: 'red' }}>{LoginStatus}</p>
            <Form>
              <Form.Group controlId="formEmail" style={{ marginTop: 10 }} >
                <Form.Label className="label">Email Address</Form.Label>
                <Form.Control
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
                <small id="passwordHelpInline" class="text-muted">
                  Must be 8 characters long.  xxxx xxxx
                </small>
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
                <small id="passwordHelpInline" class="text-muted">
                  Must be 8-20 characters long.
                </small>
              </Form.Group>

              <Button type="submit" variant="primary" onClick={this.saveAndContinue} style={{ marginTop: 25, marginLeft: "40%" }}>Next</Button>

            </Form>

            <Link to="../Login/login" style={{ marginTop: 20, marginLeft: "30%" }}>Already a Partner?</Link>
          </div>
        </div>
      </div>

    );
  }
}

export default PartnerRegister;