import Staff from "../mongodb/models/staff.js";
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

const getAllStaffs = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    name_like = "",
    staffType = "",
  } = req.query;

  const query = {};

  if (staffType !== "") {
    query.staffType = staffType;
  }

  if (name_like) {
    query.name = { $regex: name_like, $options: "i" };
  }

  try {
    const count = await Staff.countDocuments({ query });

    const staffs = await Staff.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStaffDetail = async (req, res) => {
  const { id } = req.params;
  const staffExists = await Staff.findOne({ _id: id }).populate(
    "creator"
  );

  if (staffExists) {
    res.status(200).json(staffExists);
  } else {
    res.status(404).json({ message: "Staff not found" });
  }
};

const createStaff = async (req, res) => {
  try {
    const { staffType, name, photo, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newStaff = await Staff.create({
      staffType,
      name,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allStaffs.push(newStaff._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Staff created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { staffType, name, photo, } =
      req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Staff.findByIdAndUpdate(
      { _id: id },
      {
        staffType,
        name,
        photo: photoUrl.url || photo,
      }
    );

    res.status(200).json({ message: "Staff updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staffToDelete = await Staff.findById({ _id: id }).populate(
      "creator"
    );

    if (!staffToDelete) throw new Error("Staff not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    staffToDelete.remove({ session });
    staffToDelete.creator.allStaffs.pull(staffToDelete);

    await staffToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllStaffs,
  getStaffDetail,
  createStaff,
  updateStaff,
  deleteStaff,
};
