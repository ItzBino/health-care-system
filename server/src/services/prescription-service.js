import Prescription from "../models/Prescription.js";

// Update prescription status
export const updatePrescriptionStatus = async (id, status) => {
  const validStatuses = ["ACTIVE", "CANCELLED", "EXPIRED"];
  if (!validStatuses.includes(status)) throw new Error("Invalid status value");

  const prescription = await Prescription.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!prescription) throw new Error("Prescription not found");
  return prescription;
};

// Update prescription completion
export const updatePrescriptionCompletion = async (id, isCompleted) => {
  if (typeof isCompleted !== "boolean") throw new Error("isCompleted must be boolean");

  const prescription = await Prescription.findByIdAndUpdate(
    id,
    { isCompleted },
    { new: true }
  );

  if (!prescription) throw new Error("Prescription not found");
  return prescription;
};

export const getPrescriptions = async (id) => {
  const prescription = await Prescription.find({isCompleted: false});
  if (!prescription) throw new Error("Prescription not found");
  return prescription;
};