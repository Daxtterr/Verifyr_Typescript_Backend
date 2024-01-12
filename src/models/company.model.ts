import mongoose from "mongoose";
import { ICompany } from "../@types/types";

const companySchema = new mongoose.Schema<ICompany>(
  {
    name: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    regNo: {
      type: String,
      unique: true,
    },
    website: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICompany>("company", companySchema);
