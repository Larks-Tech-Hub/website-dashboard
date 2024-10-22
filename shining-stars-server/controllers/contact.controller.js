import Contact from "../mongodb/models/contact.js";
import nodemailer from "nodemailer";

import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const createContact = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const newContact = await Contact.create({
      email,
      subject,
      message,
    });

    await session.commitTransaction();

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // School email content
    const emailContent1 = `
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Contact email content
    const emailContent2 = `
      <p>Dear Client,</p>
      <p>We thank you so much for contacting us.
      We promise to get back to you as soon as possible.</p>
      <p>Best regards,<br />Shining Stars</p>
    `;

    // Send email to school email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact message`,
      html: emailContent1,
    });

    // Send email to contact
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `New Contact message from ${email}`,
      html: emailContent2,
    });

    res.status(200).json({ message: "Contact created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createContact };
