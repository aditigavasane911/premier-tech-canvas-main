const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Admin = require("./src/models/admin.model");

dotenv.config();

const createAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("Please set MONGODB_URI in your .env file");
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected.");

    const email = process.env.ADMIN_EMAIL;
    const plainPassword = process.env.ADMIN_PASSWORD;

    if (!email || !plainPassword) {
      console.error("Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file");
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log("Admin user password updated successfully to match .env!");
    } else {
      const newAdmin = new Admin({
        email,
        password: hashedPassword,
      });
      await newAdmin.save();
      console.log(`Admin user created successfully!`);
    }

    console.log(`Email: ${email}`);
    console.log(
      `IMPORTANT: The password is securely stored in your .env file and will not be pushed to GitHub.`,
    );
  } catch (error) {
    console.error("Error creating/updating admin:", error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();
