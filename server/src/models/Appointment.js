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



// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const appointmentSchema = new Schema({
//     // --- Scheduling Details ---
    
//     // The exact start time of the appointment (in milliseconds since epoch - UTC)
//     start: {
//         type: Date, 
//         required: true,
//         index: true // Index for fast lookup/filtering by time
//     },
    
//     // The exact end time of the appointment (in milliseconds since epoch - UTC)
//     // Essential for blocking the full slot, especially for varying appointment lengths
//     end: {
//         type: Date, 
//         required: true
//     },
    
//     // The duration of the appointment in minutes
//     durationMinutes: {
//         type: Number,
//         required: true,
//         default: 30 
//     },

//     // --- Participants ---
    
//     // Reference to the Doctor/Provider/Staff member
//     doctor: {
//         type:mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Link to your Doctor's profile collection
//         required: true,
//         index: true // Index for fast retrieval of doctor's appointments
//     },

//     // Reference to the Patient/User who booked the appointment
//     patient: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User', // Link to your User/Patient collection
//         required: true
//     },
    
//     // --- Service/Context Details ---
    
//     // E.g., 'Checkup', 'Follow-up', 'Consultation'
//     reason: {
//         type: String,
//         required: true,
//         trim: true
//     },
    
//     // Optional notes/details about the appointment
//     notes: {
//         type: String,
//         trim: true
//     },

//     // --- Status and Type ---

//     // E.g., 'Booked', 'Confirmed', 'Cancelled', 'Completed', 'No-Show'
//     status: {
//         type: String,
//         enum: [ 'Confirmed', 'Cancelled', 'Completed','Requested'],
//         default: 'Requested',
//     },
    
//     // E.g., 'Office Visit', 'Telehealth', 'Home Visit'
//     type: {
//         type: String,
//         enum: ['Office Visit', 'Telehealth', 'Home Visit'],
//         default: 'Office Visit'
//     },
//      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    
  
// }, { 
//     // Mongoose option to automatically update createdAt/updatedAt
//     timestamps: true 
// });

// appointmentSchema.index({ doctorId: 1, start: 1 }, { unique: true });

// export default mongoose.model('Appointment', appointmentSchema);