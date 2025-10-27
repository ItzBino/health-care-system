import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/database.js'
import connectCloudinary from './config/cloudinary.js'
import patientRoute from './src/routes/patient-routes.js'
import doctorRoute from './src/routes/doctor-routes.js'
import adminRoute from './src/routes/admin-routes.js'
import appointmentRoute from './src/routes/appointment-routes.js'


// app config
const app = express()
dotenv.config()
connectDB()
connectCloudinary()

// middlewares
app.use("/api/appointments/webhook", express.raw({ type: "application/json" }));
app.use(express.json()); // ✅ must come BEFORE routes
app.use(cors({
  origin: [process.env.CLIENT_URL, process.env.ADMIN_URL], // add multiple if needed
  credentials: true,
}));

app.use(cookieParser())


// routes
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'API is running' }).send('API is running...')
})
app.use('/api/patient', patientRoute)
app.use('/api/doctor', doctorRoute)
app.use('/api/admin', adminRoute)
app.use('/api/book-appointment',appointmentRoute)

// server
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})