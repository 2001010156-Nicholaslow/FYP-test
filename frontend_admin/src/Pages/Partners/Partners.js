import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Partners() {
  const verifyPartners = (partner_id) => {
    console.log(partner_id);
    Axios.put("http://localhost:3001/verifypartner", {
      partner_id: partner_id,
    }).then((response) => {
      alert("Verified");
      setReload(!reload);
    });
  };
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/partners").then((response) => {
      setData(response.data);
    });
  }, [reload]);

  const [columns, setColumns] = useState([
    { title: "UEN", field: "UEN", filtering: false },
    {
      title: "Company Name",
      field: "company_name",
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
    },
    {
      title: "Company Overview",
      field: "company_overview",
      filtering: false,
    },
    {
      title: "Status",
      field: "verified",
      filtering: false,
      lookup: { 0: "Not Verified", 1: "Verified" },
    },
    {
      title: "Verify",
      field: "partners_id",
      filtering: false,

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
    />
  );
}

export default Partners;
