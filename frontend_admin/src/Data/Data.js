import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";
let d1 = moment().format("DD/MM");
let d2 = moment().add(1, "days").format("DD/MM");
let d3 = moment().add(2, "days").format("DD/MM");
let d4 = moment().add(3, "days").format("DD/MM");
let d5 = moment().add(4, "days").format("DD/MM");
let d6 = moment().add(5, "days").format("DD/MM");
let d7 = moment().add(6, "days").format("DD/MM");

let u1 = 0;

function Data() {
  const [u1, setData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getUserCreated1").then((response) => {
      setData(response.data);
    });
  }, []);
}

export const UserData = [
  {
    id: 1,
    year: d1,
    userGain: 80000,
  },
  {
    id: 2,
    year: d2,
    userGain: 45677,
  },
  {
    id: 3,
    year: d3,
    userGain: 78888,
  },
  {
    id: 4,
    year: d4,
    userGain: 90000,
  },
  {
    id: 5,
    year: d5,
    userGain: 4300,
  },

  {
    id: 6,
    year: d6,
    userGain: 4300,
  },

  {
    id: 7,
    year: d7,
    userGain: 4300,
  },
];
