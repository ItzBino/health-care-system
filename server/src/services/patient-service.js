import User from "../models/User.js";
import PatientProfile from "../models/PatientProfile.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import Appointment from "../models/Appointment.js";
import DoctorProfile from "../models/DoctorProfile.js";

//patient register service
export const register = async (body, imageFile) => {
  const { name, email, password } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (password < 6) {
    throw new Error("Password must be at least 6 characters");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    resource_type: "image",
  });
  const imageUrl = imageUpload.secure_url;

  const patientData = {
    ...body,
    name,
    email,
    password: hashedPassword,
    image: imageUrl,
    role: "PATIENT",
  };
  // console.log("Before saving patient");
  const patient = new User(patientData);
  // console.log("User instance created:", patient);
  await patient.save();
  // console.log(patient);
  return patient;
};

//Patent login service
export const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
  const patientLogin = await User.findOne({ email }).select("+password");
  if (!patientLogin) {
    throw new Error("Invalid email");
  }
  const isMatch = await bcrypt.compare(password, patientLogin.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  patientLogin.lastLogin = new Date();
  await patientLogin.save();
  return patientLogin;
};

//get all patients
// export const getAllPatients = async () => {
//   const patients = await User.find({ role: "PATIENT" });
//   return patients;
// };

//get patient by id
export const getPatientById = async (patientId) => {
  const patient = await User.findById(patientId).select("-password -role");
  return patient;
};

//create patient profile
export const createPatientProfile = async (patientId, body) => {
 const { insurance, emergencyContact } = body;
  const data = {
    user: patientId,
    ...body,
    insurance: {
      provider: insurance?.provider || "N/A",
      policyNumber: insurance?.policyNumber || "N/A",
      validTill: insurance?.validTill || null,
    },
    emergencyContact: {
      name: emergencyContact?.name || "",
      ePhone: emergencyContact?.ePhone || "",
      relation: emergencyContact?.relation || "",
    },
  };
  let profileData = new PatientProfile(data);
  await profileData.save();
  profileData = await PatientProfile.findById(profileData._id).populate("user","name email image");
  return profileData;
};


//get patient profile
export const getPatientProfile = async (patientId) => {
  const patient = await PatientProfile.findOne({user:patientId}).populate("user","name email image");
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};


//update patient profile
export const updatePatientProfile = async (patientId, body) => {
  const patient = await PatientProfile.findOneAndUpdate({user:patientId},body,{new:true});
  if (!patient) {
    throw new Error("Patient not found");
  }
  const profileData = await PatientProfile.findById(patient._id).populate("user","name email image");
  return profileData;
};


//Appointment booking
export const appointmentBooking = async (body, patientId, docId) => {
  // 1. Check if doctor exists
  const doctor = await DoctorProfile.findOne({ user: docId });
  if (!doctor) throw new Error("Doctor not found");

  // 2. Check if selected date is blocked
  const bookingDate = new Date(body.start).toISOString().split("T")[0];
  const isBlocked = doctor.blockedDates.some(date =>
    new Date(date).toISOString().split("T")[0] === bookingDate
  );
  if (isBlocked) throw new Error("Doctor is not available on this date");
  const existing = await Appointment.findOne({
    doctor: docId,
    start: body.start
  });

  if (existing) throw new Error("This slot is already booked")
  const data = {
    ...body,
    patient: patientId,
    doctor: docId,
    createdBy: patientId
  };

  // 5. Auto-calc `end` if needed (30 mins)
  if (!data.end) {
    const slotMinutes = doctor.schedule.find(s => s.dayOfWeek === new Date(body.start).getDay())?.slotMinutes || 30;
    data.end = new Date(new Date(body.start).getTime() + slotMinutes * 60000);
  }

  // 6. Save appointment
  let appointmentData = new Appointment(data);
  await appointmentData.save();

  // 7. Populate patient & doctor details
  appointmentData = await Appointment.findById(appointmentData._id)
    .populate("patient", "name email image")
    .populate("doctor", "name email image");

  return appointmentData;
};


//get patient appointments
export const getPatientAppointments = async (patientId) => {
 const now = new Date();
const appointments = await Appointment.find({
  patient: patientId,
  start: { $gte: now }, // only upcoming appointments
  status: { $in: ["REQUESTED", "CONFIRMED", "RESCHEDULED"] }
})
  .sort({ start: 1 })
  .populate("patient", "name email image")
  .populate("doctor", "name email image");
  return appointments;
};

export const fetchDoctors = async () => {
  const doctors = await DoctorProfile.find().populate({
    path: "user",
    select: "name email image emailVerified status",
    match: {
      emailVerified: true,
      status: "APPROVED", // ✅ only approved users
    },
  });

  // Filter out any doctor whose user didn’t match
  return doctors.filter((doc) => doc.user !== null);
};
