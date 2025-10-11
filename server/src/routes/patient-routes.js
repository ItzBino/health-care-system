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
router.get('doctor-profiles',patientAuth,patientRole, patientController.getAllDoctors);
router.post('/create-profile',patientAuth,patientRole, patientController.createProfile);
router.get('/get-profile',patientAuth,patientRole, patientController.getProfile);
router.patch('/update-profile',patientAuth,patientRole, patientController.updateProfile);
router.post('/book-appointment/:docId',patientAuth,patientRole,patientController.appointments);
router.post('/my-appointment',patientAuth,patientRole,patientController.getAppointments);
router.post('/logout', patientAuth,patientController.logout);


export default router;