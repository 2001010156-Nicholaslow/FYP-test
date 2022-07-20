import React from "react";
import "./App.css";
import Home from "./Home";
import Login from "./Login/Login";
import PartnerRegister from "./Register/PartnerRegister";
import Profile from "./Profile";
import YouthRegister from "./Register/YouthRegister"; //import from the js file
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavbarComp from "./Components/NavBar/NavbarComp";

function App() {
  return (
    <div>
      <NavbarComp />
    </div>
  );
}

export default App;
