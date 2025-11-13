import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/auth.js";
import { AuthContext } from "./AuthContext.jsx";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [doctor, setDoctor] = useState([]);
  const [patient, setPatient] = useState();
  const [isEditMode, setIsEditMode] = useState(true);
  const [prescription, setPrescription] = useState([]);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const {token} = useContext(AuthContext)
  

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/api/patient/doctor-profiles");
      // console.log(response.data.data);
      if (response.data.success) {
        console.log("doctors:",response.data.data);
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
      fetchDoctors();
    
  }, []);

  const createPatientProfile = async (credentials) => {
    try {
      let response;
      if (hasProfile) {
        // update existing profile
        response = await api.patch("/api/patient/update-profile", credentials);
      } else {
        response = await api.post("/api/patient/create-profile", credentials);
      }
      setIsEditMode(false);
      // console.log(response.data.data);
      if (response.data.success) {
        setPatient(response.data.data);
        setHasProfile(true);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  };

  const fetchPatientProfile = async () => {
    try {
      const response = await api.get("/api/patient/get-profile");
      // console.log(response.data.data);
      if (response.data.success && response.data.data) {
        setPatient(response.data.data);
        console.log("single patient profile: ", response.data.data);
        setHasProfile(true);
        setIsEditMode(false);
      } else {
        setHasProfile(false);
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setHasProfile(false);
      setIsEditMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   if(token){
    fetchPatientProfile();
   }
  }, []);

  const fetchPrescription = async () => {
    try {
      const response = await api.get("/api/patient/prescription");
      // console.log(response.data.data);
      if (response.data.success) {
        setPrescription(response.data.data);
        console.log("prescription: ", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(token){
fetchPrescription();
    }
  }, []);

  const fetchPatientReport = async () => {
    try {
      const response = await api.get("/api/patient/health-report");
      if (response.data.success) {
        setReport(response.data.data);
        console.log("report: ", response.data.data)
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(token){
fetchPatientReport();
    }
    
  }, []);

  const value = {
    doctor,
    setDoctor,
    fetchDoctors,
    createPatientProfile,
    isEditMode,
    setIsEditMode,
    patient,
    setPatient,
    prescription,
    setPrescription,
    report,
    setReport,
    hasProfile,
    setHasProfile,
    loading,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
