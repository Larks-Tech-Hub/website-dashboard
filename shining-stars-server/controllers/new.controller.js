import New from "../mongodb/models/new.js";
import User from "../mongodb/models/user.js";
import Student from "../mongodb/models/student.js";
import nodemailer from "nodemailer";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllNews = async (req, res) => {
  const { _end, _order, _start, _sort, title_like = "" } = req.query;

  const query = {};

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const count = await New.countDocuments({ query });

    const news = await New.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewDetail = async (req, res) => {
  const { id } = req.params;
  const newExists = await New.findOne({ _id: id }).populate("creator");

  if (newExists) {
    res.status(200).json(newExists);
  } else {
    res.status(404).json({ message: "New not found" });
  }
};

const createNew = async (req, res) => {
  try {
    const { title, description, photo, email } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newNew = await New.create({
      title,
      description,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allNews.push(newNew._id);
    await user.save({ session });

    await session.commitTransaction();

    // Fetch all students to get parent emails
    const students = await Student.find({});

    // Filter out students without parent_email
    const parentEmails = students
      .map((student) => student.parent_email)
      .filter((email) => email);

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

    // Email content
    const emailContent = `
      <p>Dear Parent,</p>
      <p>We are excited to share the latest news with you:</p>
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Content:</strong> ${description}</p>
      <p>We hope you find this news informative and engaging!</p>
      <p>Best regards,<br />Shining Stars</p>
    `;

    // Send email to all parents
    await Promise.all(
      parentEmails.map((parentEmail) =>
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: parentEmail,
          subject: `Latest News: ${title}`,
          html: emailContent,
        })
      )
    );

    res.status(200).json({ message: "New created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNew = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await New.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        photo: photoUrl.url || photo,
      }
    );

    res.status(200).json({ message: "New updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNew = async (req, res) => {
  try {
    const { id } = req.params;

    const newToDelete = await New.findById({ _id: id }).populate("creator");

    if (!newToDelete) throw new Error("New not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    newToDelete.remove({ session });
    newToDelete.creator.allNews.pull(newToDelete);

    await newToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "New deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllNews, getNewDetail, createNew, updateNew, deleteNew };
