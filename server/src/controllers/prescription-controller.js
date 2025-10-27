import { updatePrescriptionStatus, updatePrescriptionCompletion, getPrescriptions } from "../services/prescription-service.js";

// Update status
export const changePrescriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedPrescription = await updatePrescriptionStatus(id, status);
    res.status(200).json({ success: true, data: updatedPrescription });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update completion
export const changePrescriptionCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const updatedPrescription = await updatePrescriptionCompletion(id, isCompleted);
    res.status(200).json({ success: true, data: updatedPrescription });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchPrescriptions = async (req, res) => {
  try {
    const prescriptions = await getPrescriptions();
    res.status(200).json({ success: true, data: prescriptions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
