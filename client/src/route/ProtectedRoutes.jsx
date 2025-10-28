// // ProtectedRoutes.jsx
// import { Navigate, Outlet } from "react-router-dom";

// export const ProtectedRoutes = ({
//   allowedRole,
//   userRole,
//   redirectTo = "/",
// }) => {
//   if (userRole !== allowedRole) return <Navigate to={redirectTo} replace />;
//   return <Outlet />; // renders child routes
// };

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, openLoginModal }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      openLoginModal(); // open login modal
      navigate("/"); // stay on home or prevent navigation
    }
  }, [currentUser, navigate, openLoginModal]);

  // Only render children if logged in
  return currentUser ? children : null;
};

export default ProtectedRoute;
