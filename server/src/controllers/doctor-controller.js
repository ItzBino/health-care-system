import jwt from "jsonwebtoken";
import {
  login,
  register,
  getDoctorById,
  createProfile,
  getDoctorProfile,
  updateProfile,
  getBookedAppointments,
  report
} from "../services/doctor-service.js";

//doctor register
export const doctorRegister = async (req, res) => {
  try {
    const doctor = await register(req.body, req.file);
    res.status(201).json({ success:true, data:doctor, message: "Registration successful" });
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
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ success:true , data:doctor, token, message: "Login successful" });
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
    res.status(200).json({success:true, data:doctor});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//create doctor profile
export const doctorProfile = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const doctor = await createProfile(doctorId, req.body);
    res.status(200).json({success:true, data:doctor});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//update doctor profile
export const profileUpdation = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const doctor = await updateProfile(doctorId, req.body);
    res.status(200).json({success:true, data:doctor});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//get doctor profile
export const getProfile = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const doctor = await getDoctorProfile(doctorId);
    res.status(200).json({success:true, data:doctor});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

//get patient booked for appointment
export const getAppointments = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const appointments = await getBookedAppointments(doctorId);
    res.status(200).json({success:true, data:appointments});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


//medical report
export const medicalReport = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const patientId = req.params.pId;
    const report = await report(doctorId,patientId,req.body);
    res.status(200).json({success:true, data:report});
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}




//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({success: false, error: error.message });
  }
};
