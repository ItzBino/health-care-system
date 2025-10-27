import express from "express";
import * as adminController from "../controllers/admin-controller.js";
import { adminAuth, adminRole } from "../middleware/admin-auth.js";
import prescriptionRoutes from "./prescription-routes.js"
import medicalReportRoutes from "./medical-report-routes.js"

const router = express.Router();

router.post("/login", adminController.adminLogin);
router.get('/all-doctors',adminAuth,adminRole ,adminController.fetchAllDoctors);
router.get('/doctor-profiles',adminAuth,adminRole ,adminController.fetchDoctorProfile);
router.put('/user-status/:id',adminAuth,adminRole ,adminController.updateUserStatus);
router.put('/user-email-status/:id',adminAuth,adminRole ,adminController.updateEmailVerified);
router.get('/prescriptions/:id',adminAuth,adminRole ,adminController.fetchPendingPrescriptions);
router.get('/reports/:id',adminAuth,adminRole ,adminController.fetchMedicalReport);
router.get('/all-patients',adminAuth,adminRole ,adminController.fetchAllPatients);
router.get('/all-appointments',adminAuth,adminRole ,adminController.fetchAppointments);
router.put("/:doctorId/status", adminAuth,adminRole, adminController.changeDoctorStatusAndAvailability);
router.patch("/:id/status",adminAuth,adminRole, adminController.updateAppointmentStatus);
router.post("/logout", adminAuth,adminRole, adminController.adminLogout);

router.use("/prescriptions", prescriptionRoutes);
router.use("/reports", medicalReportRoutes);

export default router