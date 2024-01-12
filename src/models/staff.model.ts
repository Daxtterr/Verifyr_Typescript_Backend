import { IStaff } from "../@types/types";
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema<IStaff>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: "company",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    companyRole: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    resetPin: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStaff>("staff", staffSchema);
