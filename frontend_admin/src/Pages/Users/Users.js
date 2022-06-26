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
  }, []);

  const [columns, setColumns] = useState([
    { title: "Full Name", field: "full_name", filtering: false },
    {
      title: "Email",
      field: "email",
      filtering: false,
    },
    {
      title: "Date of birth",
      field: "dob",
      filtering: false,
      render: (rowData) => moment(rowData.dob).format("YYYY/MM/DD"),
    },
    {
      title: "Education",
      field: "education",
    },
    {
      title: "Contact Number",
      field: "contact_number",
      filtering: false,
    },
    {
      title: "Gender",
      field: "gender",
    },
    {
      title: "Citizenship",
      field: "citizenship",
    },
    {
      title: "Address",
      field: "address",
      filtering: false,
    },
    {
      title: "Postal Code",
      field: "postalcode",
      filtering: false,
    },
    {
      title: "Country",
      field: "country",
    },

    // {
    //   title: "Details",
    //   field: "user_id",
    //   render: (rowData) => {
    //     return (
    //       <button onClick={() => navigate(`/admin/user/${rowData.user_id}`)}>
    //         Details
    //       </button>
    //     );
    //   },
    // },
  ]);

  return (
    <MaterialTable
      icons={TableIcons}
      title=" Manage Users"
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

              resolve();
            }, 1000);
          }),
      }}
    />
  );
}

export default Users;
