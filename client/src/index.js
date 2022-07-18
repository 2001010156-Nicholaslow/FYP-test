import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route,Outlet,Navigate} from "react-router-dom"; //dont remove router
import Home from "./Home";
import Login from "./Login/Login";
import ForgetPassword from "./Login/ForgetPassword";
import ForgetPasswordPartner from "./Login/ForgetPasswordPartner";
import PartnerLogin from "./Login/PartnerLogin";
import PartnerRegister from "./Register/PartnerRegister";
import Profile from "./Profile";
import YouthRegister from "./Register/YouthRegister"; //import from the js file
import Partner from "./Partner/Partner";
import PartnerProfile from "./Partner/PartnerProfile";
import PartnerForm from "./Partner/PartnerForm";
import PartnerJobAd from "./Partner/PartnerJobAd";
import PartnerStats from "./Partner/PartnerStats";
import PartnerUserSearch from "./Partner/PartnerUserSearch";
import JobListing from "./JobListing";
import PartnerFormEdit from "./Partner/PartnerFormEdit";
import Welcome2 from "./Login/Welcome2";
import ResetPassword from "./Login/ResetPassword";
import Succes from "./success";
//admin
import AdminLogin from "./Pages/Login/Login";
import User from "./Pages/User/User";
import Users from "./Pages/Users/Users";
import MainPage from "./Pages/MainPage/MainPage";
import Opportunities from "./Pages/Opportunities/Opportunities";
import Partners from "./Pages/Partners/Partners";
import Reviews from "./Pages/Reviews/reviews";
import Stats from "./Pages/Stats/Stats";
import PartnerReview from "./Partner/PartnerReview";

const Requiredlogin = () => {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate replace to="/admin/login" />
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Login/login" element={<Login />} />
      <Route path="Login/Partnerlogin" element={<PartnerLogin />} />
      <Route path="Login/ForgetPassword" element={<ForgetPassword />} />
      <Route path="Login/ForgetPasswordPartner" element={<ForgetPasswordPartner />} />
      <Route path="/Register/partnerRegister" element={<PartnerRegister />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/success" element={<Succes />} />
      <Route path="/JobListing" element={<JobListing />} />
      <Route path="/Register/youthRegister" element={<YouthRegister />} />
      <Route path="/Partner/Partner/" element={<Partner />} />
      <Route path="/Partner/PartnerProfile" element={<PartnerProfile />} />
      <Route path="/Partner/PartnerForm" element={<PartnerForm />} />
      <Route path="/Partner/PartnerFormEdit" element={<PartnerFormEdit />} />
      <Route path="/Partner/PartnerStats" element={<PartnerStats />} />
      <Route path="/Partner/PartnerReview" element={<PartnerReview />} />
      <Route path="/Partner/PartnerJobAd" element={<PartnerJobAd />} />
      <Route path="/Partner/PartnerUserSearch" element={<PartnerUserSearch />}/>
      <Route path="/confirm/:ConfirmationCode" element={<Welcome2 />} />
      <Route path="/reset/:PasswordReset" element={<ResetPassword />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<Requiredlogin />}>
        <Route path="/admin/mainpage" element={<MainPage />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/user/:userId" element={<User />} />
        <Route path="/admin/opportunities" element={<Opportunities />} />
        <Route path="/admin/partners" element={<Partners />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="/admin/stats" element={<Stats />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
