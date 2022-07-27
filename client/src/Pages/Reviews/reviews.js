import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";
function Reviews() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const updatereviews = (review_id, review, rating) => {
    Axios.put("http://localhost:3001/admin_update_reviews", {
      review_id: review_id,
      review: review,
      rating: rating,
    }).then((response) => {
      alert("Updated");
      setReload(!reload);
    });
  };

  const deletereview = (review_id) => {
    Axios.put("http://localhost:3001/admin_delete_review", {
      review_id: review_id,
    }).then((response) => {
      alert("Deleted");
      setReload(!reload);
    });
  };

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
    <div className="MainPage_body_1">
      {" "}
      <MaterialTable
        icons={TableIcons}
        title=" Manage Reviews"
        columns={columns}
        data={data}
        options={{
          filtering: true,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;

                setData([...dataUpdate]);
                updatereviews(
                  newData.review_id,
                  newData.review,
                  newData.rating
                );
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                deletereview(oldData.review_id);
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }, 1000);
            }),
        }}
      />
    </div>
  );
}

export default Reviews;
