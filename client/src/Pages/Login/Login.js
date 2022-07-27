import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Axios from "axios";
import { decodeToken } from "react-jwt";
import logo from "../../Components/cyc.png";
export default function Login() {
  const [email, setEmail] = useState("Isaac@gmail.com");
  const [password, setPassword] = useState("password");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          alert("Sign in sucessfully ");
        }
        localStorage.setItem("token", response.data.token);
        window.location.assign("/admin/mainpage");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          alert("Wrong credentials");
        } else {
          alert("Something went wrong");
        }
      });
    event.preventDefault();
  }

  return (
    <div className="MainPage_body_1">
      <Form onSubmit={handleSubmit} className="Form">
        <h3>
          <img src={logo} alt="Logo" />
        </h3>
        <h1>Admin Panel</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
