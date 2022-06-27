import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
function Users() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const updateusers = (
    user_id,
    full_name,
    email,
    education,
    contact_number,
    gender,
    citizenship,
    address,
    postalcode,
    country
  ) => {
    Axios.put("http://localhost:3001/admin_update_users", {
      user_id: user_id,
      full_name: full_name,
      email: email,
      education: education,
      contact_number: contact_number,
      gender: gender,
      citizenship: citizenship,
      address: address,
      postalcode: postalcode,
      country: country,
    }).then((response) => {
      alert("Updated");
      setReload(!reload);
    });
  };

  const deleteusers = (user_id) => {
    Axios.put("http://localhost:3001/admin_delete_users", {
      user_id: user_id,
    }).then((response) => {
      alert("Deleted");
      setReload(!reload);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/admin_get_users").then((response) => {
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
      editable: "never",
      filtering: false,
      render: (rowData) => moment(rowData.dob).format("YYYY/MM/DD"),
    },
    {
      title: "Education",
      field: "education",
      lookup: {
        "GCE O Level":"GCE O Level",
        "GCE N Level": "GCE N Level",
        "GCE A Level": "GCE A Level",
        "Diploma/Degree": "Diploma/Degree",
        "Bachelor": "Bachelor",
        "Master": "Master",
      },
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
              updateusers(
                newData.user_id,
                newData.full_name,
                newData.email,
                newData.education,
                newData.contact_number,
                newData.gender,
                newData.citizenship,
                newData.address,
                newData.postalcode,
                newData.country
              );
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              deleteusers(oldData.user_id);
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
