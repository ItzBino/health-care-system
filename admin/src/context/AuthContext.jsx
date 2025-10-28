import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/auth.js";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : false
  );
  const navigate = useNavigate();

  const checkAdmin = async (payload) => {
    try {
      const response = await api.post("/api/admin/login", payload);
      if (response.data.success) {
        setAdmin(response.data.data);
        setToken(response.data.token);
        localStorage.setItem("aToken", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  
  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("aToken");
  };
  const value = {
    admin,
    token,
    checkAdmin,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
