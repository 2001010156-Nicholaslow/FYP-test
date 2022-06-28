import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage";

export default function MainPage() {
  return (
    <section>
      <br />
      <h1>
        <Link to="/admin/users">Manage Users</Link>
        <br></br>
        <Link to="/admin/partners">Manage Partner Accounts </Link>
        <br></br>
        <Link to="/admin/opportunities">Manage Opportunity</Link>
        <br></br>
        <Link to="/admin/reviews">Manage Reviews </Link>
        <br></br>
        <Link to="/admin/login">Logout</Link>
      </h1>
    </section>
  );
}
