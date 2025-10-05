import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  start: { type: Date, required: true },
  end: { type: Date }, // we’ll auto-set this
  reason: String,
  status: { 
    type: String, 
    enum: ['REQUESTED', 'CONFIRMED', 'RESCHEDULED', 'CANCELLED', 'COMPLETED'], 
    default: 'REQUESTED' 
  },
  meetingLink: String,
  notes: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


// Middleware to auto-calc `end`
appointmentSchema.pre('save', function(next) {
  if (this.start && !this.end) {
    const defaultDuration = 30; // minutes
    this.end = new Date(this.start.getTime() + defaultDuration * 60000);
  }
  next();
});

appointmentSchema.index({ doctor: 1, start: 1 }, { unique: true });

export default mongoose.model('Appointment', appointmentSchema);
