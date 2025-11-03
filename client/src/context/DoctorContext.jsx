import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/auth";
import { AuthContext } from "./AuthContext";

export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(true); // only for initial fetch
  const [patientId, setPatientId] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const {token} = useContext(AuthContext);

  // ✅ Fetch doctor profile once
  const fetchDoctorProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/doctor/get-profile");
      if (response.data.success && response.data.data) {
        setDoctorProfile(response.data.data);
        console.log("Single doctor profile:", response.data.data);
        setHasProfile(true);
        setEditMode(false);
      } else {
        setHasProfile(false);
        setEditMode(true);
      }
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
      setHasProfile(false);
      setEditMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(token){
      fetchDoctorProfile();
    }
  }, []);

  // ✅ Save or update profile (no global loading)
  const createDoctorProfile = async (profile) => {
    try {
      let response;
      if (hasProfile) {
        response = await api.patch("/api/doctor/update-profile", profile);
      } else {
        response = await api.post("/api/doctor/create-profile", profile);
      }

      if (response.data.success) {
        setDoctorProfile(response.data.data);
        setHasProfile(true);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error saving doctor profile:", error);
      throw error;
    }
  };

  // ✅ Fetch patient profile
  const fetchAllPatientProfiles = async () => {
    try {
      const response = await api.get(`/api/doctor/patient-profiles/${patientId}`);
      if (response.data.success && response.data.data) {
        setPatientDetails(response.data.data);
        console.log("Patient Details:", response.data.data);
      } else {
        setPatientDetails(null);
      }
    } catch (error) {
      console.error("Error fetching patient profiles:", error);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchAllPatientProfiles();
    }
  }, [patientId]);

  const value = {
    doctorProfile,
    setDoctorProfile,
    hasProfile,
    setHasProfile,
    editMode,
    setEditMode,
    loading,
    createDoctorProfile,
    patientId,
    setPatientId,
    fetchAllPatientProfiles,
    patientDetails,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;
