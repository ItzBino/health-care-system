import express from "express";
import { changePrescriptionStatus, changePrescriptionCompletion ,fetchPrescriptions} from "../controllers/prescription-controller.js";
import { adminAuth, adminRole } from "../middleware/admin-auth.js";

const router = express.Router();

router.get("/",adminAuth,adminRole, fetchPrescriptions);
// PUT /api/prescriptions/:id/status
router.put("/:id/status",adminAuth,adminRole, changePrescriptionStatus);

// PUT /api/prescriptions/:id/completed
router.put("/:id/completed",adminAuth,adminRole, changePrescriptionCompletion);

export default router;