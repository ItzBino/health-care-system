import jwt from 'jsonwebtoken'

export const doctorAuth = async (req, res, next) => {
    try {
        const {dToken} = req.cookies
        if (!dToken) {
            throw new Error('Unauthorized')
        }
        const decoded = jwt.verify(dToken, process.env.JWT_SECRET)
        console.log(decoded);
        req.doctor = decoded
        next()
    } catch (error) {
        res.status(401).json({ success: false, data: error.message })
    }
}

export const doctorRole = async (req, res, next) => {
    try {
        if (req.doctor.role !== "DOCTOR") {
            throw new Error('Unauthorized')
        }
        next()
    } catch (error) {
        res.status(401).json({ success: false, data: error.message })
    }
}