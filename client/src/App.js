import React from 'react';
import './App.css';
import Home from './Home';
import Login from './Login/Login';
import PartnerRegister from './Register/PartnerRegister';
import Profile from './Profile';
import YouthRegister from './Register/YouthRegister'; //import from the js file
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavbarComp from './components/NavbarComp';

function App() {
  return(
  <div>
    {/* <ul className="App">
      <li><Link to="/">Home</Link></li>
      <li><Link to="Login/login">Login</Link></li>
      <li><Link to="/Register/youthRegister">Register</Link></li>
      <li><Link to="/profile">My Profile</Link></li>
    </ul>
    <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="Login/login" element={<Login />} />
          <Route path="/Register/partnerRegister" element={<PartnerRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Register/youthRegister" element={<YouthRegister />} />
        </Routes> */}
            <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="Login/login" element={<Login />} />
          <Route path="/Register/partnerRegister" element={<PartnerRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Register/youthRegister" element={<YouthRegister />} />
        </Routes>
        { <NavbarComp/> }
    </div>);
}

export default App;