import React from 'react';
import './App.css';
import Home from './Home';
import Login from './Login/Login';
import PartnerRegister from './Register/PartnerRegister';
import Profile from './Profile';
import EditProfile from './EditProfile';
import YouthRegister from './Register/YouthRegister'; //import from the js file
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserApplication from './Application/UserApplication';
import ModalTest from './Application/ModalTest';
import ReviewApplication from './Application/ReviewApplication';
/*
function App() {
  return(
  <div className="App">
      <Router>
        <nav> 
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/partnerRegister">Register for partners</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
            <li>
              <Link to="/youthRegister">Register</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/partnerRegister" element={<PartnerRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/youthRegister" element={<YouthRegister />} />
        </Routes>
      </Router>
    </div>
  );
  }
*/

function App() {
  return(
  <div>
    <ul className="App">
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
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/Register/youthRegister" element={<YouthRegister />} />
          <Route path="/test" element={<ModalTest />} />
          <Route path="/UserApplication" element={<UserApplication />} />
          <Route path="/UserApplication/:oppId" element={<UserApplication />} />
          <Route path="/ReviewApplication/:oppId" element={<ReviewApplication />} />
        </Routes>
    </div>);
}


export default App;
