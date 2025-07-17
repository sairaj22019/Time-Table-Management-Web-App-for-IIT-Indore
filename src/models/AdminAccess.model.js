import mongoose from "mongoose";

const AdminAccessSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  }
});

// Correct: check if 'AdminAccess' model is already compiled
export default mongoose.models.AdminAccess || mongoose.model("AdminAccess", AdminAccessSchema);
