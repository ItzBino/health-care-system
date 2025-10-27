import { updateMedicalReportStatusService,getAllReports } from "../services/medical-report-service.js";

export const updateMedicalReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedReport = await updateMedicalReportStatusService(id, status);
    res.status(200).json({ success: true, data: updatedReport });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchReports = async (req, res) => {
  try {
    const reports = await getAllReports();
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};