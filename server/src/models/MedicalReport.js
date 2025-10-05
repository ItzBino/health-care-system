import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visitDate: { type: Date, default: Date.now },
  diagnoses: [String],
  vitals: { height: Number, weight: Number, bp: String, pulse: Number, temp: Number },
  treatmentPlan: String,
  // files: [{ name: String, url: String }], // gridfs/s3 URLs
  followUpDate: Date
}, { timestamps: true });

export default mongoose.model('MedicalRecord', recordSchema);