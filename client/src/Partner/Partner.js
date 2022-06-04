import 'bootstrap/dist/css/bootstrap.min.css';
import { BiHome } from "react-icons/bi";
import { Nav, Navbar } from 'react-bootstrap';
import PartnerHome from "./PartnerHome";
import './Partner.css';
function Partner() {

    return (
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

            <div className='Partner_Page'>
                <PartnerHome />
                
            </div>
        </div>
    );
}

export default Partner;