import { Link } from "react-router-dom";
import "./MainPage.css";
import logo from "../../Components/cyc.png";

function removeSession() {
  localStorage.clear();
}

export default function MainPage() {
  return (
    <section>
      <div className="MainPage_body_1">
        <div className="MainPage_h1">Main Page </div>

        <div className="MainPage_h2">
          <Link to="/admin/users">Manage Users</Link>
          <br></br>
          <Link to="/admin/partners">Manage Partner Accounts </Link>
          <br></br>
          <Link to="/admin/opportunities">Manage Opportunity</Link>
          <br></br>
          <Link to="/admin/reviews">Manage Reviews </Link>
          <br></br>
          <Link to="/admin/stats">View Statistics</Link>
          <br></br>
          <Link to="/admin/reports">View Reports</Link>
          <br></br>
          <Link to="/admin/login" onClick={removeSession}>
            Logout
          </Link>
        </div>
        <h3>
          <img src={logo} alt="Logo" />
        </h3>
      </div>
    </section>
  );
}
