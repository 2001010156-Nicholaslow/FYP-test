import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import App from "./Pages/App/App";
import Login from "./Pages/Login/Login";
import User from "./Pages/User/User";
import Users from "./Pages/Users/Users";
import MainPage from "./Pages/MainPage/MainPage";
import Opportunities from "./Pages/Opportunities/Opportunities";
import Partners from "./Pages/Partners/Partners";
import Reviews from "./Pages/Reviews/reviews";
import Stats from "./Pages/Stats/Stats";
const Requiredlogin = () => {
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate replace to="/admin/login" />
  );
};
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin/login" element={<Login />} />
      <Route element={<Requiredlogin />}>
        <Route path="/admin/mainpage" element={<MainPage />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/user/:userId" element={<User />} />
        <Route path="/admin/opportunities" element={<Opportunities />} />
        <Route path="/admin/partners" element={<Partners />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="/admin/stats" element={<Stats />} />
      </Route>
    </Routes>
  );
};

export default Routing;
