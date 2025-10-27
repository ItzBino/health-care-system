import express from "express";
import { updateMedicalReportStatus,fetchReports } from "../controllers/medical-report-controller.js";
import { adminAuth, adminRole } from "../middleware/admin-auth.js";

const router = express.Router();

router.get("/", adminAuth, adminRole,fetchReports)

// PUT /api/admin/reports/:id/status
router.put("/:id/status", adminAuth, adminRole, updateMedicalReportStatus);

export default router;
