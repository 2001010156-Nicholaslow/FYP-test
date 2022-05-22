import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <section>
      <br />
      <h1>
        <Link to="/Users">Manage Users Page</Link>
      </h1>
      <h2>
        <Link to="/admin">Manage Opportunities Page</Link>
      </h2>
    </section>
  );
}
