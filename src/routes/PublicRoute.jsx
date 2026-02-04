import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "./auth";

const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
