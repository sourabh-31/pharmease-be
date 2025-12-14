const jwt = require("jsonwebtoken");

const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d", // optional: token expires in 7 days
  });

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // None for cross-site in prod
    })
    .json({
      success: true,
      message,
    });
};

module.exports = sendCookie;
