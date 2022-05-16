import { Routes, Route } from "react-router-dom";
import App from "./Pages/App/App";
import Login from "./Pages/Login/Login";
import User from "./Pages/User/User";
import Users from "./Pages/Users/Users";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/user/:userId" element={<User />} />
    </Routes>
  );
};

export default Routing;
