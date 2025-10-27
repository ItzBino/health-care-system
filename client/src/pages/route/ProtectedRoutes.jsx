// ProtectedRoutes.jsx
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({
  allowedRole,
  userRole,
  redirectTo = "/",
}) => {
  if (userRole !== allowedRole) return <Navigate to={redirectTo} replace />;
  return <Outlet />; // renders child routes
};
