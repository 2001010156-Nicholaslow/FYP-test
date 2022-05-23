import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './YouthLogin.css';

class Login extends Component {

    render() {
        return (
                <div className='container'>
                    <div className='header'>
                        <h3 className='headertext'>Youth Login</h3>
                        <p>Find the right job with us</p>
                        <hr className='hr'></hr>
                    </div>

                    <input type="text" placeholder="Email" />
                    
                    <input type="password" placeholder="Password" />
                    <button>Login</button>
                    <Link to="../Register/YouthRegister">Sign up here</Link>
                </div>
        );
    }
}
// delete all of this
export default Login;