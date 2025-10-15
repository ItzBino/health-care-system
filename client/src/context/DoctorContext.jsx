import { createContext, useEffect, useState } from "react";
import { api } from "../api/auth";


export const DoctorContext = createContext();

const DoctorProvider = ({ children }) => {
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [hasProfile, setHasProfile] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const fetchDoctorProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/doctor/get-profile");
      if (response.data.success && response.data.data) {
        setDoctorProfile(response.data.data);
        console.log(response.data.data);
        setHasProfile(true);
        setEditMode(false); // show view mode initially
      } else {
        setHasProfile(false);
        setEditMode(true); // show editable form for new users
      }
    } catch (error) {
      console.error("Error fetching patient profile:", error);
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
      console.error("Error saving patient profile:", error);
      throw error
    }
    finally{
      setLoading(false)
    }
  };


  const value={
    doctorProfile,
    setDoctorProfile,
    hasProfile,
    setHasProfile,
    editMode,
    setEditMode,
    loading,
    setLoading,
    createDoctorProfile
  }
  return <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>;
};

export default DoctorProvider;
