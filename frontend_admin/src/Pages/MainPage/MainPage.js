import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage";

export default function MainPage() {
  return (
    <section>
      <br />
      <h1>
        <Link to="/admin/users">Manage Users</Link>
      </h1>
      <h2>
        <Link to="/admin/opportunities">Manage Opportunity</Link>
      </h2>
      <h3>
        <Link to="/admin/partners">Manage Partner Accounts </Link>
      </h3>
      <h4>
        <Link to="/admin/reviews">Manage Reviews </Link>
      </h4>
    </section>
  );
}
