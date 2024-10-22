import Admission from "../mongodb/models/admission.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

const getAllAdmissions = async (req, res) => {
  const { _end, _order, _start, _sort, name_like = "" } = req.query;

  const query = {};

  if (name_like) {
    query.name = { $regex: name_like, $options: "i" };
  }

  try {
    const count = await Admission.countDocuments({ query });

    const admissions = await Admission.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmissionDetail = async (req, res) => {
  const { id } = req.params;
  const admissionExists = await Admission.findOne({ _id: id })

  if (admissionExists) {
    res.status(200).json(admissionExists);
  } else {
    res.status(404).json({ message: "Admission not found" });
  }
};

const createAdmission = async (req, res) => {
  try {
    const {
      name,
      admission_no,
      date_of_birth,
      age,
      gender,
      grade,
      residence,
      term,
      emis_no,
      parent_name,
      parent_email,
      parent_telephone,
      parent_relationship_with_pupil,
      parent_address,
      parent_village,
      parent_lc,
      parent_nin,
      next_of_kin_name,
      next_of_kin_gender,
      next_of_kin_telephone,
      next_of_kin_relationship_with_pupil,
      next_of_kin_address,
      next_of_kin_village,
      next_of_kin_lc,
      child_medical_info,
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const newAdmission = await Admission.create({
      name,
      admission_no,
      date_of_birth,
      age,
      gender,
      grade,
      residence,
      term,
      emis_no,
      parent_name,
      parent_email,
      parent_telephone,
      parent_relationship_with_pupil,
      parent_address,
      parent_village,
      parent_lc,
      parent_nin,
      next_of_kin_name,
      next_of_kin_gender,
      next_of_kin_telephone,
      next_of_kin_relationship_with_pupil,
      next_of_kin_address,
      next_of_kin_village,
      next_of_kin_lc,
      child_medical_info,
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
    <p>Name: ${name}</p>
    <p>Admission Number: ${admission_no}</p>
    <p>Date Of Birth: ${date_of_birth}</p>
    <p>Age: ${age}</p>
    <p>Gender: ${gender}</p>
    <p>Class: ${grade}</p>
    <p>Residence: ${residence}</p>
    <p>Term: ${term}</p>
    <p>Emis No: ${emis_no}</p>
    <p>Parent/Guardian Name: ${parent_name}</p>
    <p>Parent/Guardian Email: ${parent_email}</p>
    <p>Parent/Guardian Telephone: ${parent_telephone}</p>
    <p>Parent/Guardian Relationship with pupil: ${parent_relationship_with_pupil}</p>
    <p>Parent/Guardian Address: ${parent_address}</p>
    <p>Parent/Guardian Village: ${parent_village}</p>
    <p>Parent/Guardian LC1: ${parent_lc}</p>
    <p>Parent/Guardian NIN No: ${parent_nin}</p>
    <p>Next Of Kin Name: ${next_of_kin_name}</p>
    <p>Next Of Kin Gender: ${next_of_kin_gender}</p>
    <p>Next Of Kin Telephone: ${next_of_kin_telephone}</p>
    <p>Next Of Kin Relationship with pupil: ${next_of_kin_relationship_with_pupil}</p>
    <p>Next Of Kin Address: ${next_of_kin_address}</p>
    <p>Next Of Kin Village: ${next_of_kin_village}</p>
    <p>Next Of Kin LC1: ${next_of_kin_lc}</p>
    <p>Child Medical Information (Issues): ${child_medical_info}</p>
`;

    // Contact email content
    const emailContent2 = `
    <p>Thank you so much, ${parent_name} for admitting your child into our school. 
    We promise to provide the best and quality education that your child deserves.</p>
    `;

    // Send email to school email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Admission for child, ${name}`,
      html: emailContent1,
    });

    // Send email to parent
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: parent_email,
      subject: `Admission Received`,
      html: emailContent2,
    });

    res.status(200).json({ message: "Admission created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAdmission = async (req, res) => {
  try {
    const { id } = req.params;

    const admissionToDelete = await Admission.findById({ _id: id })

    if (!admissionToDelete) throw new Error("Admission not found");

    const session = await mongoose.startSession();
    session.startTransaction();

    admissionToDelete.remove({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllAdmissions, getAdmissionDetail, createAdmission, deleteAdmission };
