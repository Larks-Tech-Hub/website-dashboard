import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stid: { type: String, required: true, unique: true},
  gender: { type: String, required: true },
  grade: { type: String, required: true },
  residence: { type: String, required: true },
  paymentCode: { type: Number, required: true },
  parent_name: { type: String, required: true },
  parent_email: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const StudentModel = mongoose.model("Student", StudentSchema);

export default StudentModel;
