import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
function Users() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setData(response.data);
    });
  });

  const [columns, setColumns] = useState([
    { title: "Full Name", field: "full_name" },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Date of birth",
      field: "dob",
      render: (rowData) => moment(rowData.dob).format("YYYY/MM/DD"),
    },
    {
      title: "Contact Number",
      field: "contact_number",
    },
    {
      title: "Gender",
      field: "gender",
    },
    {
      title: "Details",
      field: "user_id",
      render: (rowData) => {
        return (
          <button onClick={() => navigate(`/admin/user/${rowData.user_id}`)}>
            Details
          </button>
        );
      },
    },
  ]);

  return (
    <MaterialTable
      icons={TableIcons}
      title="Users"
      columns={columns}
      data={data}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />
  );
}

export default Users;
