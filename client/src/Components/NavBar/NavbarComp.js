import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'

import { Link } from "react-router-dom"; //dont remove router
import "./NavbarComp.css"

export default class NavbarComp extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant={"dark"} expand="lg">
                    <Container>
                        <Navbar.Brand href="/">C300</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                 <Nav.Link><Link to="/">Home</Link></Nav.Link>
                                 <Nav.Link><Link to="../Login/login">Login</Link> </Nav.Link>
                                 <Nav.Link><Link to="../JobListing">opp Listings</Link> </Nav.Link>
                                 <Nav.Link><Link to="../company/PartnersSearch">Partners search</Link> </Nav.Link>
                                <NavDropdown title="Register" id="basic-nav-dropdown" className="change-color">
                                    <NavDropdown.Item><Link to="../Login/Partnerlogin">Register Partner</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to="../Login/login">Register Youth</Link></NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link>
                                <Link to={"/profile/" + localStorage.getItem("Uid")}>Profile</Link>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div >
        )
    }
}