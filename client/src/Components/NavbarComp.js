import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'

export default class NavbarComp extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant={"dark"} expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#Login">Login</Nav.Link>
                                <NavDropdown title="Register" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">YouthRegister</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">PartnerRegister</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#Login">Profile</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div >
        )
    }
}