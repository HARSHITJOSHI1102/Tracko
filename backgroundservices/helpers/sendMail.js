const nodeMailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config();

function createTransporter(config) {
    const transporter = nodeMailer.createTransport(config)
    return transporter;
}

let configurations = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
}

const sendMail = async() =>{
    
}
