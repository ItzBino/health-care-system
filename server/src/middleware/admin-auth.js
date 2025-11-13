import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token not found");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const adminRole = async(req,res,next)=>{
    try {
        const admin = req.admin
        if (admin.role !== "ADMIN") {
            throw new Error("Unauthorized");
        }
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}