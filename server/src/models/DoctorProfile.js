// import mongoose from 'mongoose';

// const slotSchema = new mongoose.Schema({
//   dayOfWeek: { type: Number, min: 0, max: 6, required: true }, 
//   start: String, // "09:00"
//   end: String,   // "12:00"
//   slotMinutes: { type: Number, default: 30 },
// }, { _id: false });

// const doctorProfileSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
//   specialization: {type: String, default:'none'},
//   licenseNumber: {type: String, default:'none'},
//   clinicLocation: {type: String, default:'none'},
//   fees: { type: Number, default: 0 },
//   experienceYears: Number,
//   bio: String,
//   verificationStatus: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
//   schedule: [slotSchema],
//   blockedDates: [Date]
// }, { timestamps: true });

// doctorProfileSchema.index({ specialization: 'text', clinicLocation: 'text' });

// export default mongoose.model('DoctorProfile', doctorProfileSchema);

import mongoose from 'mongoose';

// ✅ Sub-schema for schedule
const slotSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, min: 0, max: 6, required: true },
  start: String, // "09:00"
  end: String,   // "12:00"
  slotMinutes: { type: Number, default: 30 },
}, { _id: false });

// ✅ Sub-schema for education details
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },         // e.g., "MBBS"
  college: { type: String, required: true },        // e.g., "AIIMS Delhi"
  passoutYear: { type: Number, required: true },    // e.g., 2015
}, { _id: false });

// ✅ Main schema
const doctorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },

  specialization: { type: String, default: 'none' },
  licenseNumber: { type: String, default: 'none' },
  clinicLocation: { type: String, default: 'none' },
  fees: { type: Number, default: 0 },
  experienceYears: Number,
  bio: String,

  verificationStatus: { 
    type: String, 
    enum: ['PENDING', 'VERIFIED', 'REJECTED'], 
    default: 'PENDING' 
  },

  schedule: [slotSchema],
  blockedDates: [Date],

  // ✅ New fields
  phoneNumber: { type: String, default: 'Not provided' },

  education: { type: [educationSchema], default: [] }, // array of detailed objects
  insurance: { type: [String], default: [] },          // multiple providers

}, { timestamps: true });

// Index for search optimization
doctorProfileSchema.index({ specialization: 'text', clinicLocation: 'text' });

export default mongoose.model('DoctorProfile', doctorProfileSchema);
