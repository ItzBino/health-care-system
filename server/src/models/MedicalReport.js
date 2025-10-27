import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visitDate: { type: Date, default: Date.now },
  diagnoses: [{}],
  vitals: { height: Number, weight: Number, bp: String, pulse: Number, temp: Number },
  treatmentPlan: String,
  reportNotes:{ type:String },
  symptoms:[{type:String}],
  // files: [{ name: String, url: String }], // gridfs/s3 URLs
  followUpDate: Date,
   status: { type: String, enum: ['PENDING', 'COMPLETED'], default: 'PENDING' } 
}, { timestamps: true });

export default mongoose.model('MedicalReport', recordSchema);