import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

export default ContactModel;
