import Prefect from "../mongodb/models/prefect.js";
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

const getAllPrefects = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    name_like = "",
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

  try {
    const count = await Prefect.countDocuments({ query });

    const prefects = await Prefect.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(prefects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrefectDetail = async (req, res) => {
  const { id } = req.params;
  const prefectExists = await Prefect.findOne({ _id: id }).populate(
    "creator",
  );

  if (prefectExists) {
    res.status(200).json(prefectExists);
  } else {
    res.status(404).json({ message: "Prefect not found" });
  }
};

const createPrefect = async (req, res) => {
  try {
    const { name, gender, title, grade, residence, photo, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPrefect = await Prefect.create({
      name,
      gender,
      title,
      grade,
      residence,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allPrefects.push(newPrefect._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Prefect created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePrefect = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, title, grade, residence, photo, } =
      req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Prefect.findByIdAndUpdate(
      { _id: id },
      {
        name,
        gender,
        title,
        grade,
        residence,
        photo: photoUrl.url || photo,
      },
    );

    res.status(200).json({ message: "Prefect updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePrefect = async (req, res) => {
  try {
    const { id } = req.params;

    const prefectToDelete = await Prefect.findById({ _id: id }).populate(
      "creator",
    );

    if (!prefectToDelete) throw new Error("Prefect not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    prefectToDelete.remove({ session });
    prefectToDelete.creator.allPrefects.pull(prefectToDelete);

    await prefectToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Prefect deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllPrefects,
  getPrefectDetail,
  createPrefect,
  updatePrefect,
  deletePrefect,
};
