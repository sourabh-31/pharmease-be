const serverless = require("serverless-http");
const dotenv = require("dotenv");
const connectDB = require("../../data/database");
const app = require("../../app");

// Connect to database (connection will be reused across invocations)
let dbConnected = false;

const handler = async (event, context) => {
  // Connect to DB on first invocation (cold start)
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }

  // Handle the request
  return serverless(app)(event, context);
};

module.exports.handler = handler;
