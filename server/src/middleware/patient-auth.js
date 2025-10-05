import jwt from "jsonwebtoken";

export const patientAuth = async (req, res, next) => {
    try {
        const { pToken } = req.cookies 
        if(!pToken){
            throw new Error("Unauthorized")
        }
        const decoded = jwt.verify(pToken, process.env.JWT_SECRET);
        req.patient = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const patientRole = async (req, res, next) => {
    try {
        const patient = req.patient
        if (patient.role !== "PATIENT") {
            throw new Error("You are not a patient");
        }
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};