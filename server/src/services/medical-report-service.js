import MedicalReport from "../models/MedicalReport.js";

export const updateMedicalReportStatusService = async (id, status) => {
  const validStatuses = ["PENDING", "COMPLETED"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const updatedReport = await MedicalReport.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )
    .populate("patient", "-password")
    .populate("doctor", "-password");

  if (!updatedReport) {
    throw new Error("Medical report not found");
  }

  return updatedReport;
};

export const getAllReports = async (id) => {
  const report = await MedicalReport.find({status:"PENDING"})
    .populate("patient", "-password")
    .populate("doctor", "-password");
  if (!report) throw new Error("Medical report not found");
  return report;
};