import jwt from "jsonwebtoken";
import {
  login,
  getAllDoctors,
  getAllPatients,
  getDoctorProfiles,
  changeDoctorStatus,
  updateEmailVerifiedService,
  getPendingPrescriptions,
  getMedicalReports,
  getAllAppointments,
  updateAppointmentStatusService,
  updateDoctorAvailabilityAndStatus,
} from "../services/admin-service.js";

export const adminLogin = async (req, res) => {
  try {
    console.log(req.body);
    const loginData = await login(req.body);
    console.log(loginData);
    const token = jwt.sign(
      { _id: loginData._id, role: loginData.role },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // required for HTTPS (Render uses HTTPS)
      sameSite: "none", // ✅ allows cross-site cookies (frontend↔backend)
    });

    res.status(200).json({ success: true, data: loginData, token });
  } catch (error) {
    res.status(400).json({ success: false, data: error.message });
  }
};

export const fetchAllDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(400).json({ success: false, data: error.message });
  }
};

export const fetchAllPatients = async (req, res) => {
  try {
    const patient = await getAllPatients();
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(400).json({ success: false, data: error.message });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedUser = await changeDoctorStatus(id, status);

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateEmailVerified = async (req, res) => {
  try {
    const { id } = req.params;
    const { emailVerified } = req.body;

    const updatedUser = await updateEmailVerifiedService(id, emailVerified);

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchPendingPrescriptions = async (req, res) => {
  try {
    const { id } = req.params;
    const prescriptions = await getPendingPrescriptions(id);
    res.status(200).json({ success: true, data: prescriptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchDoctorProfile = async (req, res) => {
  try {
    const doctor = await getDoctorProfiles();
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchMedicalReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await getMedicalReports(id);
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointments();
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isCompleted } = req.body;

    const updatedAppointment = await updateAppointmentStatusService(id, {
      status,
      isCompleted,
    });

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error.message);
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update appointment",
    });
  }
};

export const changeDoctorStatusAndAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { available, verificationStatus } = req.body;

    const updatedDoctor = await updateDoctorAvailabilityAndStatus(doctorId, {
      available,
      verificationStatus,
    });

    res.status(200).json({
      success: true,
      message: "Doctor status updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, data: "Logout successfully" });
  } catch (error) {
    res.status(400).json({ success: false, data: error.message });
  }
};
