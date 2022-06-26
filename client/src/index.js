import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'


import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'; //dont remove router
import Home from './Home';
import Login from './Login/Login';
import PartnerLogin from './Login/PartnerLogin';
import PartnerRegister from './Register/PartnerRegister';
import Profile from './Profile';
import YouthRegister from './Register/YouthRegister'; //import from the js file
import Partner from './Partner/Partner';
import PartnerProfile from './Partner/PartnerProfile';
import PartnerForm from './Partner/PartnerForm';
import PartnerJobAd from './Partner/PartnerJobAd';
import PartnerStats from './Partner/PartnerStats';
import PartnerUserSearch from './Partner/PartnerUserSearch';
import JobListing from './JobListing';
import PartnerFormEdit from './Partner/PartnerFormEdit';
import Welcome2 from './Login/Welcome2';
import Succes from './success';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login/login" element={<Login />} />
          <Route path="Login/Partnerlogin" element={<PartnerLogin />} />
          <Route path="/Register/partnerRegister" element={<PartnerRegister />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<Succes />} />
          <Route path="/JobListing" element={<JobListing />} />
          <Route path="/Register/youthRegister" element={<YouthRegister />} />
          <Route path="/Partner/Partner/" element={<Partner />} />
          <Route path="/Partner/PartnerProfile" element={<PartnerProfile />}/>
          <Route path="/Partner/PartnerForm" element={<PartnerForm />}/>
          <Route path="/Partner/PartnerFormEdit" element={<PartnerFormEdit />}/>
          <Route path="/Partner/PartnerJobAd" element={<PartnerJobAd />}/>
          <Route path="/Partner/PartnerUserSearch" element={<PartnerUserSearch />}/>
          <Route path="/confirm/:ConfirmationCode" element={<Welcome2 />} />

        </Routes>
  </BrowserRouter>,document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
