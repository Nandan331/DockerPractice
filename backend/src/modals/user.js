import mongoose from "mongoose";
import bcrypt from  "bcryptjs";
import crypto from "crypto";

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    mobileNumber: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
      trim: true,
      default: "",
    },
    isProfileCompleted:{
        type:Boolean,
        default: false
    },
    isOnline:{
        type:Boolean,
        default: false
    },
    lastseen:{
        type:Date,
        default: Date.now
    },
    isVerified:{
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});


export default mongoose.model("User", UserSchema);
