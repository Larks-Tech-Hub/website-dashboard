import mongoose from "mongoose";

const AdmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  admission_no: { type: String, required: true },
  date_of_birth: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  grade: { type: String, required: true },
  residence: { type: String, required: true },
  term: { type: String, required: true },
  emis_no: { type: String },
  parent_name: { type: String, required: true },
  parent_email: { type: String, required: true },
  parent_telephone: { type: String, required: true },
  parent_relationship_with_pupil: { type: String, required: true },
  parent_address: { type: String, required: true },
  parent_village: { type: String, required: true },
  parent_lc: { type: String, required: true },
  parent_nin: { type: String, required: true },
  next_of_kin_name: { type: String, required: true },
  next_of_kin_gender: { type: String, required: true },
  next_of_kin_telephone: { type: String, required: true },
  next_of_kin_relationship_with_pupil: { type: String, required: true },
  next_of_kin_address: { type: String, required: true },
  next_of_kin_village: { type: String, required: true },
  next_of_kin_lc: { type: String, required: true },
  child_medical_info: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const AdmissionModel = mongoose.model("ChildAdmission", AdmissionSchema);

export default AdmissionModel;
