import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";

function Opportunities() {
  const [data, setData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/opportunity").then((response) => {
      setData(response.data);
    });
  });

  const [columns, setColumns] = useState([
    { title: "Job Name", field: "name" },
    {
      title: "Job Scope",
      field: "job_scope",
    },
    {
      title: "Job description",
      field: "description",
    },

    {
      title: "Sub description",
      field: "sub_description",
    },
  ]);
  return (
    <MaterialTable
      icons={TableIcons}
      title=" Manage Opportunities"
      columns={columns}
      data={data}
    />
  );
}

export default Opportunities;
