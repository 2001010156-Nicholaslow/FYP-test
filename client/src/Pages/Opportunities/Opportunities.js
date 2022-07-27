import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";

function Opportunities() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    Axios.get("http://localhost:3001/admin_get_opp").then((response) => {
      setData(response.data);
    });
  }, []);

  const updateopp = (
    opp_id,
    name,
    position_level,
    salary,
    job_scope,
    description,
    additional_requirements
  ) => {
    Axios.put("http://localhost:3001/admin_update_opp", {
      opp_id: opp_id,
      name: name,
      position_level: position_level,
      salary: salary,
      job_scope: job_scope,
      description: description,
      additional_requirements: additional_requirements,
    }).then((response) => {
      alert("Updated");
      setReload(!reload);
    });
  };
  const deleteopp = (opp_id) => {
    Axios.put("http://localhost:3001/admin_delete_opp", {
      opp_id: opp_id,
    }).then((response) => {
      alert("Deleted");
      setReload(!reload);
    });
  };

  const [columns, setColumns] = useState([
    { title: "Job Name", field: "name" },
    {
      title: "Company",
      field: "company_name",
    },
    {
      title: "Position",
      field: "position_level",
    },
    {
      title: "Salary",
      field: "salary",
    },
    {
      title: "Job Scope",
      field: "job_scope",
    },
    {
      title: "Job description",
      field: "description",
    },

    {
      title: "Additional Requirements",
      field: "additional_requirements",
    },
  ]);
  return (
    <div className="MainPage_body_1">
      <MaterialTable
        icons={TableIcons}
        title=" Manage Opportunities"
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
                updateopp(
                  newData.opp_id,
                  newData.name,
                  newData.position_level,
                  newData.salary,
                  newData.job_scope,
                  newData.description,
                  newData.additional_requirements
                );
                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                deleteopp(oldData.opp_id);
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

export default Opportunities;
