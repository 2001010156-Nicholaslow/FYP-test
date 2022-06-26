import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; //dont remove router



function App() {
  
  return (
    <div>
      <ul className="App">
        <li><Link to="/">Home</Link></li>
        <li><Link to="Login/login">Login</Link></li>
        <li><Link to="/Register/youthRegister">Youth Register</Link></li>
        <li><Link to="/Register/PartnerRegister">Partner Register</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
      </ul>

    </div>);
}


export default App;
