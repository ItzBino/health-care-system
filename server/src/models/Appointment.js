import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  reason: String,
  status: { 
    type: String, 
    enum: ['REQUESTED', 'CONFIRMED', 'RESCHEDULED', 'CANCELLED', 'COMPLETED'], 
    default: 'REQUESTED' 
  },
  isCompleted: { type: Boolean, default: false },
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// ✅ Prevent double-booking
appointmentSchema.index({ doctor: 1, slotDate: 1, slotTime: 1 }, { unique: true });

export default mongoose.model('Appointment', appointmentSchema);


