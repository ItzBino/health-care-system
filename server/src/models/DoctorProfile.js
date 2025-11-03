import mongoose from 'mongoose';


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

  available: { type: Boolean, default: true },
  slots_booked: { type: Object, default: {} },
 
  
  // ✅ New fields
  phoneNumber: { type: String, default: 'Not provided' },

  education: { type: [educationSchema], default: [] }, // array of detailed objects
  insurance: { type: [String], default: [] },          // multiple providers

}, { timestamps: true ,minimize: false });

// Index for search optimization
doctorProfileSchema.index({ specialization: 'text', clinicLocation: 'text' });

export default mongoose.model('DoctorProfile', doctorProfileSchema);


