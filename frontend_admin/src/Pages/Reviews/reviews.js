import React, { useState, useEffect } from "react";
import TableIcons from "../../Components/MaterialTablesIcons/TablesIcons";
import MaterialTable from "material-table";
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Reviews() {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);


  // const verifyPartners = (partner_id) => {
  //   console.log(partner_id);
  //   Axios.put("http://localhost:3001/verifypartner", {
  //     partner_id: partner_id,
  //   }).then((response) => {
  //     alert("Verified");
  //     setReload(!reload);
  //   });
  // };

  // const updatepartners = (partners_id, contact_name, email, contact_number) => {
  //   Axios.put("http://localhost:3001/admin_update_partner", {
  //     contact_name: contact_name,
  //     contact_number: contact_number,
  //     email: email,
  //     partners_id: partners_id,
  //   }).then((response) => {
  //     alert("Updated");
  //     setReload(!reload);
  //   });
  // };

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
    }
    ,{
      title:"Company",
      field:"company_name"
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

export default Reviews;
