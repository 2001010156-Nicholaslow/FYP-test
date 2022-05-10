import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState,useEffect } from "react";

function App() {
  const [data,setData]=useState()
  useEffect(() => {
    axios
      .get(`http://localhost:3001/`)
      .then((response) => {
        let data = response.data;
        console.log(data)
        setData(data)
      })
      .catch((error) => {
        console.log(error);
        alert("Error when submitting, please try again.");
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         {data}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
