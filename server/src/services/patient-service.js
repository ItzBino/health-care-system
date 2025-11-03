import User from "../models/User.js";
import PatientProfile from "../models/PatientProfile.js";
import bcrypt from "bcrypt";
import validator from "validator";
import Appointment from "../models/Appointment.js";
import DoctorProfile from "../models/DoctorProfile.js";
import Prescription from "../models/Prescription.js";
import MedicalReport from "../models/MedicalReport.js";
import mongoose from "mongoose";
import { cloudinary } from "../../config/cloudinary.js";


// ===============================
// Patient Registration Service
// ===============================
export const register = async (body, file) => {
  const { name, email, password } = body;

  // ✅ Basic validation
  if (!name || !email || !password) throw new Error("All fields are required");
  if (!validator.isEmail(email)) throw new Error("Invalid email");
  if (password.length < 6) throw new Error("Password must be at least 6 characters long");

  // ✅ Check if patient already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already in use");

  // ✅ Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ✅ Default profile image
  let imageUrl =
    "https://res.cloudinary.com/dyrukgnno/image/upload/v1758117051/jcfmctqa3y6i0y8rfels.jpg";

  // ✅ Upload to Cloudinary directly (from memory)
  if (file && file.buffer) {
    try {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
      const uploaded = await cloudinary.uploader.upload(base64, {
        folder: "patients",
        resource_type: "image",
      });
      imageUrl = uploaded.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw new Error("Image upload failed");
    }
  }

  // ✅ Create and save new patient
  const patient = new User({
    ...body,
    name,
    email,
    password: hashedPassword,
    image: imageUrl,
    role: "PATIENT",
  });

  await patient.save();
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
  const patient = await User.findById(patientId).select("-password");
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




//get patient appointments
export const getPatientAppointments = async (patientId) => {
  const now = new Date();

  const appointments = await Appointment.find({
    patient: patientId,
    isCompleted: false,
  })
    .populate("patient", "name email image")
    .populate("doctor","name email image");

  return appointments;
};

export const fetchDoctors = async () => {
  const doctors = await DoctorProfile.find()
    .populate({
      path: "user",
      select: "name email image emailVerified status",
    })
    .lean();

  // Filter out doctors whose user is not approved or email not verified
  return doctors.filter(
    (doc) => doc.user && doc.user.emailVerified === true && doc.user.status === "APPROVED"
  );
};


export const getPrescriptions = async (patientId) => {
  const prescriptionData = await Prescription.find({
    patient: patientId,
    isCompleted: false   // ✅ filter by completion instead of status
  })
    .populate("patient", "name email image")
    .populate("doctor", "name email image");

  return prescriptionData;
};




export const getDoctorProfileWithBookedTimes = async (doctorId) => {
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    throw new Error("Invalid doctor ID");
  }

  // 1️⃣ Try to find by User ID first
  let doctorProfile = await DoctorProfile.findOne({ user: doctorId })
    .populate("user", "name email image emailVerified status")
    .lean();

  // 2️⃣ If not found, try to find by DoctorProfile _id
  if (!doctorProfile) {
    doctorProfile = await DoctorProfile.findById(doctorId)
      .populate("user", "name email image emailVerified status")
      .lean();
  }

  if (!doctorProfile) throw new Error("Doctor not found");

  // 3️⃣ Fetch future appointments
  const futureAppointments = await Appointment.find({
    doctor: doctorProfile._id,
    start: { $gte: Date.now() },
    status: { $in: ["Requested", "Confirmed", "REQUESTED", "CONFIRMED"] },
  }).lean();

  const bookedTimes = futureAppointments.map(a => Number(a.start));

  return { doctorProfile, bookedTimes };
};



export const getMedicalRecords = async (patientId) => {
  const data = await MedicalReport.find({
    patient:patientId,
   status: "PENDING"}
  )
    .populate("patient", "name email image")
    .populate("doctor", "name email image")
    .sort({ visitDate: -1 }); // latest first

  return data; // if no records, returns []
};

