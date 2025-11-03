
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Prescriptions from "./pages/Prescriptions";
import Patients from "./pages/Patients";
import Reports from "./pages/Reports";
import Appointments from "./pages/Appointments";
import {ToastContainer} from 'react-toastify';

const App = () => {
  const {token} = useContext(AuthContext);
  return (
    <div>
      {token ? (
        <div>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/patients" element={<Patients/>} />
            <Route path="/appointments" element={<Appointments/>} />
            <Route path="/script/:id" element={<Prescriptions />} />
            <Route path="/reports/:id" element={<Reports/>} />
          </Routes>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
