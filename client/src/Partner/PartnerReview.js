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
