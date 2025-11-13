import User from "../models/User.js";
import bcrypt from "bcrypt";
import DoctorProfile from "../models/DoctorProfile.js";
import Prescription from "../models/Prescription.js";
import MedicalReport from "../models/MedicalReport.js";
import Appointment from "../models/Appointment.js";
import mongoose from "mongoose";
import PatientProfile from "../models/PatientProfile.js";

export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const aLogin = await User.findOne({ email }).select("+password");
  if (!aLogin) {
    throw new Error("Invalid email");
  }
  const isMatch = await bcrypt.compare(password, aLogin.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  await User.findByIdAndUpdate(aLogin._id, { lastLogin: new Date() });
  return aLogin;
};

export const getAllDoctors = async () => {
  const doctors = await User.find({ role: "DOCTOR" }).select("-password");
  return doctors;
};

export const getDoctorProfiles = async () => {
  const doctors = await DoctorProfile.find().populate("user", "-password") // populate user, exclude password
    .sort({ createdAt: -1 });
  return doctors;
};

export const changeDoctorStatus = async (doctorId, status) => {
  const validStatuses = ["PENDING", "APPROVED", "SUSPENDED"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const updatedUser = await User.findByIdAndUpdate(
    doctorId,
    { status },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

export const updateEmailVerifiedService = async (id, emailVerified) => {
  if (typeof emailVerified !== 'boolean') throw new Error('emailVerified must be boolean');

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { emailVerified },
    { new: true }
  ).select('-password');

  if (!updatedUser) throw new Error('User not found');

  return updatedUser;
};



export const getPendingPrescriptions = async (id) => {
  // Fetch prescriptions where isCompleted is false
  const prescriptions = await Prescription.find({patient:id, isCompleted: false })
    .populate("patient", "-password")
    .populate("doctor", "-password")
    .sort({ createdAt: -1 });

  return prescriptions;
};

export const getMedicalReports = async (id) => {
  const reports = await MedicalReport.find({ patient: id })
    .populate("patient", "-password")
    .populate("doctor", "-password")
    .sort({ createdAt: -1 });

  return reports;
};


export const getAllPatients = async () => {
  const patients = await PatientProfile.find().populate("user", "-password");
  return patients;
};

export const getAllAppointments = async () => {
  const appointments = await Appointment.find()
    .populate("patient", "-password")
    .populate("doctor", "-password")
    .sort({ createdAt: -1 });
  return appointments;
};

export const updateAppointmentStatusService = async (id, data) => {
  const { status, isCompleted } = data;

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    id,
    { status, isCompleted },
    { new: true }
  )
    .populate("doctor", "name email image")
    .populate("patient", "name email image");

  if (!updatedAppointment) {
    throw new Error("Appointment not found");
  }

  return updatedAppointment;
};


export const updateDoctorAvailabilityAndStatus = async (doctorId, updates) => {
  const { available, verificationStatus } = updates;

  // Validate verification status
  if (verificationStatus && !['PENDING', 'VERIFIED', 'REJECTED'].includes(verificationStatus)) {
    throw new Error("Invalid verification status");
  }

  // Find and update doctor
  const updatedDoctor = await DoctorProfile.findByIdAndUpdate(
    doctorId,
    { $set: { available, verificationStatus } },
    { new: true }
  );

  if (!updatedDoctor) {
    throw new Error("Doctor not found");
  }

  return updatedDoctor;
};
