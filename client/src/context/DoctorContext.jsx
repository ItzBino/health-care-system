import { createContext, useEffect, useState } from "react";
import { api } from "../api/auth";


export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(true);
const [patientId , setPatientId] = useState(null);
const [patientDetails, setPatientDetails] = useState(null);

  const fetchDoctorProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/doctor/get-profile");
      if (response.data.success && response.data.data) {
        setDoctorProfile(response.data.data);
        console.log("single doctor profile: ", response.data.data);
        setHasProfile(true);
        setEditMode(false); // show view mode initially
      } else {
        setHasProfile(false);
        setEditMode(true); // show editable form for new users
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
    fetchDoctorProfile();
  }, []);

  const createDoctorProfile = async (profile) => {
    setLoading(true);
    try {
     let response;

      if (hasProfile) {
        // update existing profile
        response = await api.patch("/api/doctor/update-profile", profile);
      } else {
        // create new profile
        response = await api.post("/api/doctor/create-profile", profile);
      }

      if (response.data.success) {
        setDoctorProfile(response.data.data);
        setHasProfile(true);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error saving doctor profile:", error);
      throw error
    }
    finally{
      setLoading(false)
    }
  };

  const fetchAllPatientProfiles = async () => {
    try {
      const response = await api.get(`/api/doctor/patient-profiles/${patientId}`);
      if (response.data.success && response.data.data) {
         setPatientDetails(response.data.data)
         console.log("patient Details: ", response.data.data)
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching patient profiles:", error);
      return [];
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchAllPatientProfiles();
    }
  }, [patientId]);

  const value={
    doctorProfile,
    setDoctorProfile,
    hasProfile,
    setHasProfile,
    editMode,
    setEditMode,
    loading,
    setLoading,
    createDoctorProfile,
    patientId,
    setPatientId,
    fetchAllPatientProfiles,
    patientDetails
  }
  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorProvider;
