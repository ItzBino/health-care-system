import React, { useContext } from 'react'
import PatientProfileForm from '../patient/PatientProfileForm'
import DoctorProfileForm from '../doctor/DoctorProfileForm'
import { AuthContext } from '../../context/AuthContext'

const Settings = () => {
    const role = localStorage.getItem('role')
  return role === "PATIENT" ? (
   <PatientProfileForm/>
  ):(
    <DoctorProfileForm/>
  )
}

export default Settings
