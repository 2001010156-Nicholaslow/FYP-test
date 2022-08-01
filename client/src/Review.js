import React, { useState } from "react";
import Home from "./Home";
import Login from "./Login/Login";
import PartnerRegister from "./Register/PartnerRegister";
import Profile from "./Profile";
import YouthRegister from "./Register/YouthRegister"; //import from the js file
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavbarComp from "./Components/NavBar/NavbarComp";
import "./App.scss";
import { Form } from "react-bootstrap";
import Axios from "axios";

function Review() {
  const [review, setRiview] = useState("");
  const [rating, setRating] = useState(null);

  const add_reviews = () => {
    const user_id = JSON.parse(localStorage.getItem("user_data")).result[0]
      .user_id;
    const partnerData = JSON.parse(window.localStorage.getItem("Application"));
    const jdata = partnerData.find((y) => y.user_id === user_id);
    const config = {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    Axios.post(
      "http://localhost:3001/add_reviews",
      {
        user_id: JSON.parse(localStorage.getItem("user_data")).result[0]
          .user_id,
        review: review,
        partners_id: jdata.fk_partners_id,
        rating: rating,
      },
      config
    ).then((response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <h3>Review page</h3>

      <Form>
        <input
          classname="login_box"
          type="text"
          onChange={(e) => {
            setRiview(e.target.value);
          }}
          placeholder="review"
          style={{ marginTop: 10 }}
          required
        />
        <br></br>

        <input
          classname="login_box"
          type="number"
          onChange={(e) => {
            setRating(e.target.value);
          }}
          placeholder="rating"
          style={{ marginTop: 10 }}
          required
        />
      </Form>
      <button
        className="submit"
        type="submit"
        onClick={add_reviews}
        style={{ marginTop: 20, marginBottom: 20, alignItems: "center" }}
      >
        submit
      </button>
    </div>
  );
}

export default Review;
