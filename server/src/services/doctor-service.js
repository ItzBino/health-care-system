import User from "../models/User.js";
import DoctorProfile from "../models/DoctorProfile.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import Appointment from "../models/Appointment.js";
import MedicalReport from "../models/MedicalReport.js";
import Prescription from "../models/Prescription.js";
import PatientProfile from "../models/PatientProfile.js";

//creating doctor user
export const register = async (body, imageFile) => {
  const { name, email, password } = body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already in use");
  if (!name || !email || !password) throw new Error("All fields are required");

  if (!validator.isEmail(email)) throw new Error("Invalid email");
  if (password.length < 6) throw new Error("Password must be at least 6 characters");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Default image
  let imageUrl = 'https://res.cloudinary.com/dyrukgnno/image/upload/v1758117051/jcfmctqa3y6i0y8rfels.jpg';

  // Only upload if imageFile exists
  if (imageFile && imageFile.path) {
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    imageUrl = imageUpload.secure_url;
  }

  const doctorData = {
    ...body,
    name,
    email,
    password: hashedPassword,
    image: imageUrl,
    role: "DOCTOR",
  };

  const doctor = new User(doctorData);
  await doctor.save();
  return doctor;
};

//doctor login
export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const doctorLogin = await User.findOne({ email }).select("+password");
  if (!doctorLogin) {
    throw new Error("Invalid email");
  }
  const isMatch = await bcrypt.compare(password, doctorLogin.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  doctorLogin.lastLogin = new Date();
  await doctorLogin.save();
  return doctorLogin;
};

//get doctor by id
export const getDoctorById = async (doctorId) => {
  const doctor = await User.findById(doctorId).select("-password");
  if(!doctor){
    throw new Error("Doctor not found");
  }
  return doctor;
};

//create doctor profile
export const createProfile = async (doctorId, body) => {
  const data = {
    user: doctorId,
    ...body,
  };
  let profileData = new DoctorProfile(data);
  await profileData.save();
  profileData = await DoctorProfile.findById(profileData._id).populate("user");
  return profileData;
};

//get patient profile
export const getDoctorProfile = async (doctorId) => {
  const doctor = await DoctorProfile.findOne({ user: doctorId }).populate(
    "user"
  );
  if (!doctor) {
    throw new Error("Doctor not found");
  }
  return doctor;
};

//update doctor profile
export const updateProfile = async (doctorId, body) => {
  const doctor = await DoctorProfile.findOneAndUpdate(
    { user: doctorId },
    body,
    { new: true }
  );
  if (!doctor) {
    throw new Error("Doctor not found");
  }
  const profileData = await DoctorProfile.findById(doctor._id).populate("user");
  return profileData;
};

//get patient booked for appointment
export const getBookedAppointments = async (doctorId) => {
  
  const appointments = await Appointment.find({
    doctor: doctorId,
    isCompleted: false,
  
  })
  .populate("patient", "name email image")
  .populate("doctor", "name email image");

  if (appointments.length === 0) {
    throw new Error("No appointments found");
  }

  return appointments;
};

export const getAllPatientProfiles = async(patientId) => {
  const patient = await PatientProfile.findOne({user:patientId}).populate("user","name email image");
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
}


export const healthReport = async(doctorId,patientId,body) => {
  const data = {
    patient:patientId,
    doctor:doctorId,
    ...body
  }
  const reportInfo = new MedicalReport(data);
  await reportInfo.save();
  const reportData = await MedicalReport.findById(reportInfo._id).populate("patient","name email image").populate("doctor","name email image");
  return reportData;
  
}

export const createPrescription = async (doctorId, patientId, body) => {
  const data = { patient: patientId, doctor: doctorId, ...body };

  // rename local variable
  const newPrescription = new Prescription(data);
  await newPrescription.save();

  const prescriptionData = await Prescription.findById(newPrescription._id)
    .populate("patient", "name email image")
    .populate("doctor", "name email image");

  return prescriptionData;
};
