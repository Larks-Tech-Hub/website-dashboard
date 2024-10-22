import Admin from "../mongodb/models/admin.js";
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

const getAllAdmins = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    name_like = "",
    title = "",
  } = req.query;

  const query = {};

  if (title !== "") {
    query.title = title;
  }

  if (name_like) {
    query.name = { $regex: name_like, $options: "i" };
  }

  try {
    const count = await Admin.countDocuments({ query });

    const admins = await Admin.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdminDetail = async (req, res) => {
  const { id } = req.params;
  const adminExists = await Admin.findOne({ _id: id }).populate(
    "creator"
  );

  if (adminExists) {
    res.status(200).json(adminExists);
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { title, name, message, description, photo, email } =
      req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newAdmin = await Admin.create({
      title,
      name,
      message,
      description,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allAdmins.push(newAdmin._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, name, message, description, photo, } =
      req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Admin.findByIdAndUpdate(
      { _id: id },
      {
        title,
        name,
        message,
        description,
        photo: photoUrl.url || photo,
      }
    );

    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const adminToDelete = await Admin.findById({ _id: id }).populate(
      "creator"
    );

    if (!adminToDelete) throw new Error("Admin not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    adminToDelete.remove({ session });
    adminToDelete.creator.allAdmins.pull(adminToDelete);

    await adminToDelete.creator.save({ session });
    await session.commitTransaction();

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllAdmins,
  getAdminDetail,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
