import React from 'react';
import './App.css';
import Home from './Home';
import Login from './Login/Login';
import PartnerRegister from './Register/PartnerRegister';
import Profile from './Profile';
import YouthRegister from './Register/YouthRegister'; //import from the js file
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'; //dont remove router
import Partner from './Partner/Partner';
import PartnerProfile from './Partner/PartnerProfile';
import PartnerForm from './Partner/PartnerForm';
import PartnerJobAd from './Partner/PartnerJobAd';
import PartnerStats from './Partner/PartnerStats';
import PartnerUserSearch from './Partner/PartnerUserSearch';



function App() {
  return (
    <div>
      <ul className="App">
        <li><Link to="/">Home</Link></li>
        <li><Link to="Login/login">Login</Link></li>
        <li><Link to="/Register/youthRegister">Register</Link></li>
        <li><Link to="/profile">My Profile</Link></li>
      </ul>
      <div className='Style_page'>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login/login" element={<Login />} />
          <Route path="/Register/partnerRegister" element={<PartnerRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Register/youthRegister" element={<YouthRegister />} />
          <Route path="/Partner/Partner" element={<Partner />} />
          <Route path="/Partner/PartnerProfile" element={<PartnerProfile />}/>
          <Route path="/Partner/PartnerForm" element={<PartnerForm />}/>
          <Route path="/Partner/PartnerJobAd" element={<PartnerJobAd />}/>
          <Route path="/Partner/PartnerUserSearch" element={<PartnerUserSearch />}/>
          <Route path="/Partner/PartnerStats" element={<PartnerStats />}/>
        </Routes>
      </div>

    </div>);
}


export default App;
