const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SEND_EMAIL_HOST,
  port: process.env.SEND_EMAIL_PORT,
  secure: process.env.SEND_EMAIL_SECURE === "true",
  auth: {
    user: process.env.SEND_EMAIL_USER,
    pass: process.env.SEND_EMAIL_PASS,
  },
});

module.exports = { transporter };
