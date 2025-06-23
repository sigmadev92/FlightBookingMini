import nodemailer from "nodemailer";
import { HOST_MAIL, HOST_PASS } from "../config/env.js";

const transporter = nodemailer.createTransport({
  auth: {
    user: HOST_MAIL,
    pass: HOST_PASS,
  },
  service: "gmail",
});

export async function sendtheMail(params) {
  const mailOptions = {
    from: HOST_MAIL,
    to: params.receiver,
    subject: params.subject,
    html: params.html,
  };

  //Step-3 Send a mail

  try {
    await transporter.sendMail(mailOptions);
    console.log("EMail sent successfully");
  } catch (error) {
    console.log("ERROR IN SENDING MAIL", err);
  }
}
