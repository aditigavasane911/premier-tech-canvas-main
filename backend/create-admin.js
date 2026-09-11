const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Admin = require("./src/models/admin.model");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sstdb");
    console.log("MongoDB connected.");

    const email = "gosavionkar52@gmail.com";
    const plainPassword = "adminpassword123";

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin user already exists with this email.");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log(`Admin user created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${plainPassword}`);
    console.log(
      `IMPORTANT: Please run this script once, confirm login, and then DELETE this file for security.`,
    );
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();
