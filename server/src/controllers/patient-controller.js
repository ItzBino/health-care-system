import jwt from "jsonwebtoken";
import {
  register,
  login,
  getPatientById,
  createPatientProfile,
  getPatientProfile,
  updatePatientProfile,
  getPatientAppointments,
  fetchDoctors,
  getPrescriptions,
  getMedicalRecords,
  getDoctorProfileWithBookedTimes
} from "../services/patient-service.js";

//Patient register
export const patientRegister = async (req, res) => {
  try {
    const patient = await register(req.body, req.file);
    res.status(201).json({
      data: patient,
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//Patient login
export const patientLogin = async (req, res) => {
  try {
    const patient = await login(req.body);
    const token = jwt.sign(
      { id: patient._id, role: patient.role },
      process.env.JWT_SECRET
    );
   res.cookie("pToken", token, {
  httpOnly: true,
  secure: true, // required for HTTPS (Render uses HTTPS)
  sameSite: "none", // ✅ allows cross-site cookies (frontend↔backend)
});

    res.status(200).json({
      success: true,
      data: patient,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
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
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//create patient profile
export const createProfile = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const patient = await createPatientProfile(patientId, req.body);
    res.status(200).json({ success: true, data: patient, message: "Profile created successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//getting patient profile
export const getProfile = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const patient = await getPatientProfile(patientId);
    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//update patient profile
export const updateProfile = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const patient = await updatePatientProfile(patientId, req.body);
    res.status(200).json({ success: true, data: patient ,message: "Profile updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};



//get booked appointment
export const getAppointments = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const appointments = await getPatientAppointments(patientId);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};




/**
 * GET /api/patient/:doctorId/booked
 */
export const getDoctorWithBookedTimes = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const { doctorProfile, bookedTimes } = await getDoctorProfileWithBookedTimes(doctorId);
    return res.status(200).json({ doctorProfile, bookedTimes });
  } catch (error) {
    console.error("Error fetching doctor profile and bookings:", error);

    if (error.message === "Invalid doctor ID") return res.status(400).json({ message: error.message });
    if (error.message === "Doctor not found") return res.status(404).json({ message: error.message });

    return res.status(500).json({ message: "Internal server error while fetching doctor data." });
  }
};


export const fetchPrescription = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const prescription = await getPrescriptions(patientId);
    res.status(200).json({ success: true, data: prescription });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


//Medical Report
export const fetchMedicalReport = async (req, res) => {
  try {
    const patientId = req.patient.id;
    const report = await getMedicalRecords(patientId);
    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await fetchDoctors();
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//logout
export const logout = async (req, res) => {
  try {
     res.clearCookie("pToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
