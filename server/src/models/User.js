import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  role: { type: String, enum: ['ADMIN', 'DOCTOR', 'PATIENT'], required: true },
  password: { type: String, required: true, select: false },
  image: { type: String, default: 'https://res.cloudinary.com/dyrukgnno/image/upload/v1758117051/jcfmctqa3y6i0y8rfels.jpg' },   
  status: { type: String, enum: ['PENDING', 'APPROVED', 'SUSPENDED'], default: 'APPROVED' },
  emailVerified: { type: Boolean, default: true },
  lastLogin: Date
}, { timestamps: true });


export default mongoose.model('User', userSchema);