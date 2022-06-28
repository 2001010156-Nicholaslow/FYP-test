import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Partners() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const verifyPartners = (partner_id) => {
    console.log(partner_id);
    Axios.put("http://localhost:3001/admin_verify_partner", {
      partner_id: partner_id,
    }).then((response) => {
      alert("Verified");
      setReload(!reload);
    });
  };

  const updatepartners = (partners_id, contact_name, email, contact_number) => {
    Axios.put("http://localhost:3001/admin_update_partner", {
      contact_name: contact_name,
      contact_number: contact_number,
      email: email,
      partners_id: partners_id,
    }).then((response) => {
      alert("Updated");
      setReload(!reload);
    });
  };

  const deletepartner = (partners_id) => {
    Axios.put("http://localhost:3001/admin_delete_partner", {
      partners_id: partners_id,
    }).then((response) => {
      alert("Deleted");
      setReload(!reload);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/admin_get_partners").then((response) => {
      setData(response.data);
    });
  }, [reload]);

  const [columns, setColumns] = useState([
    { title: "UEN", field: "UEN", filtering: false, editable: "never" },
    {
      title: "Company Name",
      field: "company_name",
      editable: "never",
    },
    {
      title: "Contact Name",
      field: "contact_name",
      filtering: false,
    },
    {
      title: "Contact Email",
      field: "email",
      filtering: false,
    },
    {
      title: "Contact Number",
      field: "contact_number",
      filtering: false,
    },
    {
      title: "Industry",
      field: "company_industry",
      editable: "never",
    },
    {
      title: "Company Overview",
      field: "company_overview",
      filtering: false,
      editable: "never",
    },
    {
      title: "Status",
      field: "verified",
      filtering: false,
      lookup: { 0: "Not Verified", 1: "Verified" },
      editable: "never",
    },
    {
      title: "Verify",
      field: "partners_id",
      filtering: false,
      editable: "never",

      render: (rowData) => {
        return (
          <button
            onClick={() => {
              verifyPartners(rowData.partners_id);
            }}
          >
            Verify
          </button>
        );
      },
    },
  ]);

  return (
    <MaterialTable
      icons={TableIcons}
      title=" Manage Partners"
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
              updatepartners(
                newData.partners_id,
                newData.contact_name,
                newData.email,
                newData.contact_number
              );
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              deletepartner(oldData.partners_id);
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              resolve();
            }, 1000);
          }),
      }}
    />
  );
}

export default Partners;
