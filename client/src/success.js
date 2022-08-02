import React from "react";
import { Link } from "react-router-dom";
import { GoMail } from "react-icons/go";
import './success.css';
import NavbarComp from "./Components/NavBar/NavbarComp";

function success() {

    const Verify = {
        

    }

    return (
        <div>
            <div>
                <NavbarComp />
            </div>


            <div className="container_welcome">
                <header className="jumbotron">
                    <div className="success_image">
                        <h1 className="image_icon_success"><GoMail /></h1>
                    </div>
                    <div className="icon_success">
                        <h3><strong>Verify your email address</strong></h3>
                        <p>A verfication mail has been sent to your email account. Please check your inbox to verify.</p>
                    </div>

                    <Link to="../"><button className="success_buton" onClick={Verify}>Return Home</button></Link>

                </header>

            </div>
        </div>
    );
}

export default success;