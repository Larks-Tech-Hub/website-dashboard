import Slider from "../mongodb/models/slider.js";
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

const getAllSliders = async (req, res) => {
  const { _end, _order, _start, _sort, title_like = "" } = req.query;

  const query = {};

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const count = await Slider.countDocuments({ query });

    const sliders = await Slider.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSliderDetail = async (req, res) => {
  const { id } = req.params;
  const sliderExists = await Slider.findOne({ _id: id }).populate("creator");

  if (sliderExists) {
    res.status(200).json(sliderExists);
  } else {
    res.status(404).json({ message: "Slider not found" });
  }
};

const createSlider = async (req, res) => {
  try {
    const { title, description, photo, email } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newSlider = await Slider.create({
      title,
      description,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allSliders.push(newSlider._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Slider created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Slider.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        photo: photoUrl.url || photo,
      }
    );

    res.status(200).json({ message: "Slider updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const sliderToDelete = await Slider.findById({ _id: id }).populate(
      "creator"
    );

    if (!sliderToDelete) throw new Error("Slider not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    sliderToDelete.remove({ session });
    sliderToDelete.creator.allSliders.pull(sliderToDelete);

    await sliderToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Slider deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllSliders,
  getSliderDetail,
  createSlider,
  updateSlider,
  deleteSlider,
};
