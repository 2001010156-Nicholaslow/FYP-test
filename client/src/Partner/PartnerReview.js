/*
import React, { useState, useEffect } from "react";
import TableIcons from "../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";
function PartnerReview() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/admin_get_reviews").then((response) => {
      setData(response.data);
    });
  }, [reload]);

  const [columns, setColumns] = useState([
    { title: "Reviews", field: "review" },
    {
      title: "Rating",
      field: "rating",
    },
    {
      title: "User name",
      field: "full_name",
    },
    {
      title: "Company",
      field: "company_name",
    },
  ]);

  return (
    <MaterialTable
      icons={TableIcons}
      title=" Manage Reviews"
      columns={columns}
      data={data}
      options={{
        filtering: true,
      }}
    />
  );
}

export default PartnerReview;
*/


import React, { useState, useEffect } from 'react';
import Reviewspage from '../Components/reviews/Reviewspage';
import Reviewspost from '../Components/reviews/Reviewspost';
import axios from 'axios';
import './PartnerReview.css';

const PartnerReview = () => {
  const [Rposts, setRPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setRPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = Rposts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Reviews</h1>
      <Reviewspost Rposts={currentPosts} loading={loading} />
      <Reviewspage
        postsPerPage={postsPerPage}
        totalPosts={Rposts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default PartnerReview;

/*
import React, { useState, useEffect } from "react";
import LineChart from "../Components/LineChart";
import Axios from "axios";
import moment from "moment";

function PartnerReview() {
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

export default PartnerReview;
*/
