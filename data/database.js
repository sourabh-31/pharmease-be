const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/PharmEase`, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✓ Connected to Database Successfully");
  } catch (err) {
    console.error("✗ Database Connection Error:", err.message);
    throw err; // Re-throw so the function can handle it
  }
};

module.exports = connectDB;
