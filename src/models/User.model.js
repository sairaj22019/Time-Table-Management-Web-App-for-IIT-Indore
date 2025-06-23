import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [/^[\w.-]+@iiti\.ac\.in$/, "please use a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleProvider;
      },
    },
    googleProvider: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyOtp: {
      type: String,
      required: false
    },
    verifyOtpExpiry: {
      type: Date,
      required: false
    },
    role: {
      type: String,
      enum: ["student", "professor", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model("User", userSchema);

export default User;
