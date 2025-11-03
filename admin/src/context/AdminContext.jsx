import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/auth";
import { AuthContext } from "./AuthContext";

export const AdminContext = createContext()

const AdminContextProvider = ({ children }) => {
    const [doctors,setDoctors] = useState([])
    const [patients,setPatients] = useState([])
    const [profile,setProfile] = useState([])
    const [appointments,setAppointments] = useState([])
    const [allReports,setAllReports] = useState([])
    const [allPrescriptions,setAllPrescriptions] = useState([])
    const {aToken} = useContext(AuthContext)

    const fetchAllDoctors = async () => {
        const response = await api.get('/api/admin/all-doctors')
        console.log(response.data.data)
        setDoctors(response.data.data)
    }
    useEffect(() => {
        fetchAllDoctors()
    },[])

  const fetchDoctorProfiles = async () => {
  console.log("fetchDoctorProfiles() called"); // ✅ check this first
  try {
    const response = await api.get('/api/admin/doctor-profiles');
    console.log("API response:", response.data); // ✅ see what comes back
    setProfile(response.data.data);
  } catch (error) {
    console.error("Error fetching profiles:", error);
  }
};


    useEffect(() => {
      if(aToken){
      fetchDoctorProfiles()
      }
        
    },[])

    const fetchAllPatient = async () => {
        console.log("fetchPatientProfiles() called");
        const response = await api.get('/api/admin/all-patients')
       console.log("Patient API response:", response.data);
        setPatients(response.data.data)
    }

    useEffect(() => {
      if(aToken){
        fetchAllPatient()
      }   
    },[])

      const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.put(`/api/admin/user-status/${id}`, { status: newStatus });
      setDoctors((prev) =>
        prev.map((doc) => (doc._id === id ? res.data.data : doc))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleEmailStatus = async (id, emailVerified) => {
    try {
      const res = await api.put(`/api/admin/user-email-status/${id}`, { emailVerified });
      setDoctors((prev) =>
        prev.map((doc) => (doc._id === id ? res.data.data : doc))
      );
    } catch (error) {
      console.error("Failed to update emailVerified:", error);
    }
  };

  const fetchAllAppointments = async () => {
    try {
          const response = await api.get('/api/admin/all-appointments')
          if(response.data.success){
            setAppointments(response.data.data)
          }
    console.log("appointments: ",response.data.data)
  } catch (error) {
    console.log(error)
    console.error("Failed to fetch appointments:", error.data.message);
  }
  }

  useEffect(() => {
    if(aToken){
       fetchAllAppointments()
    }
  },[])


  const fetchAllReports = async () => {
    try {
          const response = await api.get('/api/admin/reports/')
          if(response.data.success){
            setAllReports(response.data.data)
          }
    console.log("All reports: ",response.data.data)
  } catch (error) {
    console.log(error)
    console.error("Failed to fetch reports:", error.data.message);
  }
  }

  useEffect(() => {
    if(aToken){
       fetchAllReports()
    }
  },[])

  const fetchAllPrescriptions = async () => {
    try {
          const response = await api.get('/api/admin/prescriptions/')
          if(response.data.success){
            setAllPrescriptions(response.data.data)
          }
    console.log("All prescriptions: ",response.data.data)
  } catch (error) {
    console.log(error)
    console.error("Failed to fetch prescriptions:", error.data.message);
  }
  }

  useEffect(() => {
    if(aToken){
       fetchAllPrescriptions()
    }
  },[])


    const value ={
        doctors,
        patients,
        profile,
        handleStatusChange,
        handleEmailStatus,
        appointments,
        setAppointments,
        setProfile,
        allReports,
        allPrescriptions
    }
    return (
        <AdminContext.Provider value={ value}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider