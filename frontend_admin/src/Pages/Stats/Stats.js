import React, { useState, useEffect } from "react";
import LineChart from "../../Components/LineChart";
import Axios from "axios";
import moment from "moment";

function App() {
  const [userData, setUserData] = useState();
  useEffect(() => {
    Axios.get("http://localhost:3001/getUserCreated1").then((response) => {
      console.log(response.data);
      let payload = response.data;
      setUserData({
        labels: payload.map((data) => moment(data.date).format("YYYY/MM/DD")),
        datasets: [
          {
            label: "Users Gained",
            data: payload.map((data) => data.count),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
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
      </div>
    </div>
  );
}

export default App;
