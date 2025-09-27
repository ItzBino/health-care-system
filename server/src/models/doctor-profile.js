import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  dayOfWeek: { type: Number, min: 0, max: 6, required: true }, 
  start: String, // "09:00"
  end: String,   // "12:00"
  slotMinutes: { type: Number, default: 30 },
}, { _id: false });

const doctorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  specialization: {type: String, default:'none'},
  licenseNumber: {type: String, default:'none'},
  clinicLocation: {type: String, default:'none'},
  fees: { type: Number, default: 0 },
  experienceYears: Number,
  bio: String,
  verificationStatus: { type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING' },
  schedule: [slotSchema],
  blockedDates: [Date]
}, { timestamps: true });

doctorProfileSchema.index({ specialization: 'text', clinicLocation: 'text' });

export default mongoose.model('DoctorProfile', doctorProfileSchema);