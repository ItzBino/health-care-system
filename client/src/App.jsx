import React, { useState, useContext } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/common/DoctorDetails";
import PatientProfile from "./pages/patient/PatientProfile";
import PatientDashboard from "./pages/patient/PatientDashboard";
import BookedAppointments from "./pages/patient/BookedAppointments";
import Reports from "./pages/patient/Reports";
import Prescriptions from "./pages/patient/Prescriptions";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import { AuthContext } from "./context/AuthContext";
import Settings from "./pages/common/Settings";
import BookingPage from "./pages/common/BookingPage";
import PrescriptionForm from "./pages/doctor/PrescriptionForm";
import MedicalReportForm from "./pages/doctor/MedicalReportForm";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import MyAppointments from "./pages/doctor/MyAppointments";
import ProtectedRoute from "./route/ProtectedRoutes";
import Services from "./pages/Services";
import ContactPage from "./pages/ContactUs";
import { ToastContainer} from 'react-toastify';

const App = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { loading, userRole } = useContext(AuthContext);
  console.log(userRole);

  const switchToLogin = () => {
    setShowRegister(false);
    setTimeout(() => setShowLogin(true), 200); // Small delay for smooth transition
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setTimeout(() => setShowRegister(true), 200); // Small delay for smooth transition
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  
 

  return (
    <>
       <ToastContainer />
      <Navbar setShowRegister={setShowRegister} setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/contact" element={<ContactPage/>} />

        <Route path="/settings" element={<Settings />} />
        <Route
          path="/prescription-form/:patientId"
          element={<PrescriptionForm />}
        />
        <Route path="/report-form/:patientId" element={<MedicalReportForm />} />

        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:docId" element={<DoctorDetails />} />
        <Route
          path="/booking/:docId"
          element={
            <ProtectedRoute openLoginModal={() => setShowLogin(true)}>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            userRole === "PATIENT" ? <PatientDashboard /> : <DoctorDashboard />
          }
        >
          {/* Patient routes */}
          {userRole === "PATIENT" && (
            <>
              <Route path="overview" element={<PatientProfile />} />
              <Route path="my-appointments" element={<BookedAppointments />} />
              <Route path="reports" element={<Reports />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route index element={<Navigate to="overview" />} />
            </>
          )}

          {/* Doctor routes */}
          {userRole === "DOCTOR" && (
            <>
              <Route path="overview" element={<DoctorProfile />} />
              <Route path="my-appointments" element={<MyAppointments />} />
              <Route index element={<Navigate to="overview" />} />
            </>
          )}
        </Route>
      </Routes>

      {/* Modals - These appear on top of any page */}
      <Register
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToLogin={switchToLogin}
      />
      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitchToRegister={switchToRegister}
      />
      <Footer />
    </>
  );
};

export default App;
