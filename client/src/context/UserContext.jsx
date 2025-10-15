import { createContext, useEffect, useState } from "react";
import { api } from "../api/auth.js";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [doctor, setDoctor] = useState([]);
  const [patient, setPatient] = useState();
  const [isEditMode, setIsEditMode] = useState(true);
  const [prescription, setPrescription] = useState([]);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDoctors = async () => {
    try {
      const response = await api.get("/api/patient/doctor-profiles");
      // console.log(response.data.data);
      if (response.data.success) {
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
      if (!isEditMode) {
        response = await api.patch("/api/patient/update-profile", credentials);
      } else {
        response = await api.post("/api/patient/create-profile", credentials);
      }
      setIsEditMode(false);
      // console.log(response.data.data);
      if (response.data.success) {
        setPatient(response.data.data);
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
      if (response.data.success) {
        setPatient(response.data.data);
      }
      if(response.data.data){
        setIsEditMode(true);
      }else{
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientProfile();
  }, []);

  const fetchPrescription = async () => {
    try {
      const response = await api.get("/api/patient/prescription");
      // console.log(response.data.data);
      if (response.data.success) {
        setPrescription(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescription();
  }, []);

  const fetchPatientReport = async () => {
    try {
      const response = await api.get("/api/patient/health-report");
      console.log(response.data.data);
      if (response.data.success) {
        setReport(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientReport();
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
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
