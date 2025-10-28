import express from "express";
import * as patientController from "../controllers/patient-controller.js";
import { patientAuth } from "../middleware/patient-auth.js";
import { patientRole } from "../middleware/patient-auth.js";
import upload  from '../middleware/multer.js'

const router = express.Router();


router.post("/register",upload.single('image'), patientController.patientRegister);
router.post("/login", patientController.patientLogin);
// router.get("/all-patients", patientController.getAllPatients);
router.get('/',patientAuth,patientRole, patientController.patientById);
router.get('/doctor-profiles',patientAuth,patientRole, patientController.getAllDoctors);
router.post('/create-profile',patientAuth,patientRole, patientController.createProfile);
router.get('/get-profile',patientAuth,patientRole, patientController.getProfile);
router.get('/:doctorId/booked',patientAuth,patientRole, patientController.getDoctorWithBookedTimes);
router.patch('/update-profile',patientAuth,patientRole, patientController.updateProfile);
router.get('/my-appointment',patientAuth,patientRole,patientController.getAppointments);
router.get('/prescription',patientAuth,patientRole,patientController.fetchPrescription);
router.get('/health-report',patientAuth,patientRole,patientController.fetchMedicalReport);
router.post('/logout', patientAuth,patientController.logout);



export default router;