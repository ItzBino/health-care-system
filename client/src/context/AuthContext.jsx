import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem('role')?localStorage.getItem('role'):"PATIENT");
    const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if(userRole) {
    localStorage.setItem("role", userRole);
  }
}, [userRole]);

  //get user profile
  const refreshUser = async () => {
    try {
      let response;
      const role = localStorage.getItem("role");
      if (role === "PATIENT") {
        response = await api.get("/api/patient/");
      } else {
        response = await api.get("/api/doctor/");
      }
      if (response.data.success) {
        setUser(response.data.data);
        setUserRole(role);
        console.log(response.data.data);
        return response.data.success
      }
    } catch (error) {
      setUser(null);
      console.log(error);
      throw error;
    }
    finally{
      setLoading(false);
    }
  };

  //login function
  const login = async (credentials) => {
    try {
      let response;
      if (userRole === "PATIENT") {
        response = await api.post("/api/patient/login", credentials);
      } else {
        response = await api.post("/api/doctor/login", credentials);
      }
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", userRole);
        setToken(response.data.token);
        setUserRole(localStorage.getItem("role"));
        return await refreshUser();
      }
    } catch (error) {
      throw error; // error will be caught in component
    }
    finally{
      setLoading(false);
    }
  };

  const register = async (credentials) => {
    try {
      let response;
      if (userRole === "PATIENT") {
        response = await api.post("/api/patient/register", credentials);
      } else {
        response = await api.post("/api/doctor/register", credentials);
      }
      if (response.data.success) {
        return true;
      }
    } catch (error) {
      throw error; // error will be caught in component
    }
    finally{
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (userRole === "PATIENT") {
        await api.post("/api/patient/logout");
      } else {
        await api.post("/api/doctor/logout");
      } // backend clears cookie
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken(false);
      setUser(null); // clear user from context
      navigate("/"); // redirect to login page
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);




  const value = {
    userRole,
    setUserRole,
    token,
    setToken,
    login,
    register,
    logout,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
