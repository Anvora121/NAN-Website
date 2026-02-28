const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const admin = await Admin.findOne({
      email: "admin123@gmail.com",
    });

    if (admin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const newAdmin = await Admin.create({
      email: "admin123@gmail.com",
      password: "Admin123",
    });

    console.log("Admin created:", newAdmin.email);
    process.exit(0);
  } catch (err) {
    console.error("Admin creation failed:", err);
    process.exit(1);
  }
}

createAdmin();
