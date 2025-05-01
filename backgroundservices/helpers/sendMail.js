const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const configurations = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

function createTransporter(config) {
  return nodemailer.createTransport(config);
}

const sendMail = async (messageoption) => {
  try {
    const transporter = createTransporter(configurations);
    await transporter.verify();
    const info = await transporter.sendMail(messageoption);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendMail;
