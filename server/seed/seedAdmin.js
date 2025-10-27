import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../src/models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);

    const existingAdmin = await User.findOne({ role: "ADMIN" });
    if (existingAdmin) {
      console.log("Admin already exists:", existingAdmin.email);
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
    });

    await admin.save();
    console.log("Admin account created:", admin.email);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
