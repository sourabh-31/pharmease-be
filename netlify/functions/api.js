const serverless = require("serverless-http");
const mongoose = require("mongoose");
const app = require("../../app");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✓ Using existing database connection");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not set!");
  }

  try {
    await mongoose.connect(`${process.env.MONGO_URI}/PharmEase`, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = mongoose.connection.readyState === 1;
    console.log("✓ MongoDB Connected to PharmEase database");
  } catch (error) {
    console.error("✗ MongoDB Connection Error:", error.message);
    throw error;
  }
};

const handler = async (event, context) => {
  // Prevent function from waiting for empty event loop
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // Connect to database
    await connectDB();

    // Handle the request
    return await serverless(app)(event, context);
  } catch (error) {
    console.error("✗ Function error:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        message: "Internal server error",
      }),
    };
  }
};

module.exports.handler = handler;
