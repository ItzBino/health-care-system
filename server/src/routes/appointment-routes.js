import express from "express";
import { bookAppointment } from "../controllers/appointment-controller.js";
import { patientAuth, patientRole } from "../middleware/patient-auth.js";

const router = express.Router();

// Create normal appointment
router.post("/:docId", patientAuth, patientRole, bookAppointment);



export default router;
