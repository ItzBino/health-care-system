
import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medications: [{ name: String, dosage: String, frequency: String, duration: String, notes: String }],
  issuedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['ACTIVE', 'CANCELLED', 'EXPIRED'], default: 'ACTIVE' },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Prescription', prescriptionSchema);