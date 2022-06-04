import React from 'react';
import { BiHome } from "react-icons/bi";
import { Nav, Navbar } from 'react-bootstrap';

function PartnerUserSeach(){
    return(
        <div>
        <Navbar bg="dark" variant="dark">
            <Nav.Link href="./Partner">
                <div className="image_icon_nav">
                    <BiHome />
                </div>
            </Nav.Link>
            <Nav className="me-auto">
                <Nav.Link href="./PartnerJobAd">Job Ad</Nav.Link>
                <Nav.Link href="./PartnerUserSearch">Search user</Nav.Link>
                <Nav.Link href="./PartnerStats">Statics</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="./PartnerProfile">NicholasLow</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>

        <div>
            <h1>This is the Partner Search page</h1>
            
        </div>
    </div>
    );
}

  
export default PartnerUserSeach;