import mongoose from "mongoose";

const patientProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    dob: Date,
    gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"], required: true },
    address: { type: String, trim: true },
    phone: { type: String },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      default: "none",
    },
    allergies: [{ type: String }],
    chronicConditions: { type: [String], default: ["None"] },
    medications: { type: [String], default: ["None"] },

    insurance: {
      provider: String,
      policyNumber: String,
      validTill: Date,
    },
    emergencyContact: { name: String, ePhone: String, relation: String },
  },
  { timestamps: true }
);

export default mongoose.model("PatientProfile", patientProfileSchema);
