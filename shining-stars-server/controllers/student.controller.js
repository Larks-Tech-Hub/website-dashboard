import Student from "../mongodb/models/student.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllStudents = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    name_like = "",
    stid_like = "",
    grade = "",
    gender = "",
    residence = "",
  } = req.query;

  const query = {};

  if (grade !== "") {
    query.grade = grade;
  }

  if (gender !== "") {
    query.gender = gender;
  }

  if (residence !== "") {
    query.residence = residence;
  }

  if (name_like) {
    query.name = { $regex: name_like, $options: "i" };
  }

  if (stid_like) {
    query.stid = { $regex: stid_like, $options: "i" };
  }

  try {
    const count = await Student.countDocuments({ query });

    const students = await Student.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentDetail = async (req, res) => {
  const { id } = req.params;
  const studentExists = await Student.findOne({ _id: id }).populate("creator");

  if (studentExists) {
    res.status(200).json(studentExists);
  } else {
    res.status(404).json({ message: "Student not found" });
  }
};

const createStudent = async (req, res) => {
  try {
    const {
      name,
      stid,
      gender,
      grade,
      residence,
      paymentCode,
      parent_name,
      parent_email,
      email,
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const newStudent = await Student.create({
      name,
      stid,
      gender,
      grade,
      residence,
      paymentCode,
      parent_name,
      parent_email,
      creator: user._id,
    });

    user.allStudents.push(newStudent._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Student created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      stid,
      gender,
      grade,
      residence,
      paymentCode,
      parent_name,
      parent_email,
    } = req.body;

    await Student.findByIdAndUpdate(
      { _id: id },
      {
        name,
        stid,
        gender,
        grade,
        residence,
        paymentCode,
        parent_name,
        parent_email,
      }
    );

    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const studentToDelete = await Student.findById({ _id: id }).populate(
      "creator"
    );

    if (!studentToDelete) throw new Error("Student not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    studentToDelete.remove({ session });
    studentToDelete.creator.allStudents.pull(studentToDelete);

    await studentToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllStudents,
  getStudentDetail,
  createStudent,
  updateStudent,
  deleteStudent,
};
