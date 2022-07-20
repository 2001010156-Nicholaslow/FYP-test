import React, { useState, useEffect } from "react";
import LineChart from "../../Components/LineChart";
import Axios from "axios";
import moment from "moment";

function App() {
  const [userData, setUserData] = useState();
  const [PartnerData, setPartnerData] = useState();
  useEffect(() => {
    Axios.get("http://localhost:3001/getUserCreated1").then((response) => {
      console.log(response.data);
      let payload = response.data;
      setUserData({
        labels: payload.map((data) => moment(data.date).format("YYYY/MM/DD")),
        datasets: [
          {
            label: "Users Created",
            data: payload.map((data) => data.count),
            backgroundColor: ["rgba(9, 45, 240, 0.8)"],
            borderWidth: 2,
          },
        ],
      });
      console.log(moment().format("YYYY/MM/DD"));
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/getPartnerCreated1").then((response) => {
      console.log(response.data);
      let payload = response.data;
      setPartnerData({
        labels: payload.map((data) => moment(data.date).format("YYYY/MM/DD")),
        datasets: [
          {
            label: "Partner Created",
            data: payload.map((data) => data.count),
            backgroundColor: ["rgba(183, 19, 19, 0.8)"],
            borderWidth: 2,
          },
        ],
      });
      console.log(moment().format("YYYY/MM/DD"));
    });
  }, []);

  return (
    <div className="App">
      <div style={{ width: 700 }}>
        <LineChart chartData={userData} />
        <LineChart chartData={PartnerData} />
      </div>
    </div>
  );
}

export default App;
