import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";
function Reports() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const deletereport = (report_id) => {
    Axios.put("http://localhost:3001/admin_delete_reports", {
        report_id: report_id,
    }).then((response) => {
      alert("Deleted");
      setReload(!reload);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/admin_get_reports").then((response) => {
      setData(response.data);
    });
    
  }, [reload]);

  const [columns, setColumns] = useState([
    { title: "Report", field: "report_id" },
    {
      title: "Type",
      field: "report_type",
    },
    {
      title: "Title",
      field: "report_title",
    },
    {
      title: "Text",
      field: "report_text",
    },
    {
        title: "partners_id",
        field: "partners_id",
      },
  ]);

  return (
    <MaterialTable
      icons={TableIcons}
      title=" Manage Reports"
      columns={columns}
      data={data}
      options={{
        filtering: true,
      }}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              deletereport(oldData.review_id);
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              resolve();
            }, 1000);
          }),
      }}
    />
  );
}

export default Reports;
