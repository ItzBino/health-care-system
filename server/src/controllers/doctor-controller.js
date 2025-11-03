import jwt from "jsonwebtoken";
import {
  login,
  register,
  getDoctorById,
  createProfile,
  getDoctorProfile,
  updateProfile,
  getBookedAppointments,
  healthReport,
  createPrescription,
  getAllPatientProfiles,
} from "../services/doctor-service.js";

//doctor register
export const doctorRegister = async (req, res) => {
  try {
    const doctor = await register(req.body, req.file);
    res
      .status(201)
      .json({
        success: true,
        data: doctor,
        message: "Registration successful",
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//doctor login
export const doctorLogin = async (req, res) => {
  try {
    console.log(req.body);
    const doctor = await login(req.body);
    const token = jwt.sign(
      { id: doctor._id, role: doctor.role },
      process.env.JWT_SECRET
    );
    res.cookie("dToken", token, {
      httpOnly: true,
      secure: true, // required for HTTPS (Render uses HTTPS)
      sameSite: "none", // ✅ allows cross-site cookies (frontend↔backend)
    });

    res
      .status(200)
      .json({
        success: true,
        data: doctor,
        token,
        message: "Login successful",
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
};

//get doctor by id
export const doctorById = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const doctor = await getDoctorById(doctorId);
    console.log(doctor);
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//create doctor profile
export const doctorProfile = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const doctor = await createProfile(doctorId, req.body);
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//update doctor profile
export const profileUpdation = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const doctor = await updateProfile(doctorId, req.body);
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//get doctor profile
export const getProfile = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const doctor = await getDoctorProfile(doctorId);
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//get patient booked for appointment
export const getAppointments = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const appointments = await getBookedAppointments(doctorId);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const fetchAllPatients = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await getAllPatientProfiles(patientId);
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(400).json({ success: false, data: error.message });
  }
};

//medical report
export const patientReport = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const patientId = req.params.pId;
    const report = await healthReport(doctorId, patientId, req.body);
    res
      .status(200)
      .json({
        success: true,
        data: report,
        message: "Report created successfully",
      });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//prescription
export const medicalPrescription = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const patientId = req.params.pId;
    const prescription = await createPrescription(
      doctorId,
      patientId,
      req.body
    );
    res
      .status(200)
      .json({
        success: true,
        data: prescription,
        message: "Prescription created successfully",
      });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
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
