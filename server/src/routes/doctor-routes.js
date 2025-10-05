import express from "express";
import * as doctorController from "../controllers/doctor-controller.js";
import { doctorAuth } from "../middleware/doctor-auth.js";
import { doctorRole } from "../middleware/doctor-auth.js";
import upload  from '../middleware/multer.js'

const router = express.Router();


router.post("/register",upload.single('image'), doctorController.doctorRegister);
router.post("/login", doctorController.doctorLogin);
// router.get("/all-doctors", doctorController.getAllDoctors);
router.get('/',doctorAuth,doctorRole, doctorController.doctorById);
router.post('/create-profile',doctorAuth,doctorRole, doctorController.doctorProfile);
router.get('/get-profile',doctorAuth,doctorRole, doctorController.getProfile);
router.patch('/update-profile',doctorAuth,doctorRole, doctorController.profileUpdation);
router.get('/appointment',doctorAuth,doctorRole,doctorController.getAppointments);
router.post('/report/:pId',doctorAuth,doctorRole,doctorController.medicalReport);
router.post('/logout', doctorAuth,doctorController.logout);

export default router;