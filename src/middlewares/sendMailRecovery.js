const nodemailer = require("nodemailer");

// Escolha entre host para email pessoal de hospedagem ou 
// service (por exemplo: gmail)

const transporter = nodemailer.createTransport({
  host: process.env.SEND_EMAIL_HOST,
  // service: process.env.SEND_EMAIL_SERVICE,
  port: process.env.SEND_EMAIL_PORT,
  secure: process.env.SEND_EMAIL_SECURE === "true",
  auth: {
    user: process.env.SEND_EMAIL_USER,
    pass: process.env.SEND_EMAIL_PASS,
  },
});

module.exports = { transporter };
