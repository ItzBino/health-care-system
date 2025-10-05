import jwt from "jsonwebtoken";
import {
  register,
  login,
  getPatientById,
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
  appointmentBooking,
  getPatientAppointments,
} from "../services/patient-service.js";

//Patient register
export const patientRegister = async (req, res) => {
  try {
    const patient = await register(req.body, req.file);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Patient login
export const patientLogin = async (req, res) => {
  try {
    console.log(req.body);
    const patient = await login(req.body);
    const token = jwt.sign(
      { id: patient._id, role: patient.role },
      process.env.JWT_SECRET
    );
    res.cookie("pToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ patient, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

//getting all patients
// export const allPatients = async (req, res) => {
//     try {
//         const patients = await getAllPatients();
//         res.status(200).json(patients);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

//getting patient by id
export const patientById = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const patient = await getPatientById(patientId);
    console.log(patient);
    res.status(200).json({success:true, data:patient});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//create patient profile
export const createProfile = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const patient = await createPatientProfile(patientId, req.body);
    res.status(200).json({success:true, data:patient});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//getting patient profile
export const getProfile = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const patient = await getPatientProfile(patientId);
    res.status(200).json({success:true, data:patient});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//update patient profile
export const updateProfile = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const patient = await updatePatientProfile(patientId, req.body);
    res.status(200).json({success:true, data:patient});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });}
};

//Appointment booking
export const appointments = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const docId = req.params.docId;
    const patient = await appointmentBooking(req.body, patientId, docId);
    res.status(200).json({success:true, data:patient});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//get booked appointment
export const getAppointments = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const appointments = await getPatientAppointments(patientId);
    res.status(200).json({success:true, data:appointments});
  } catch (error) {
    res.status(400).json({ success:false, error: error.message });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
