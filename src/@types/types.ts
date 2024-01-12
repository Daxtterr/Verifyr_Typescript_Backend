import { Types } from "mongoose";

export interface ICompany {
  name: string;
  address: string;
  phoneNumber: string;
  regNo: string;
  email: string;
  status: string;
  website: string;
}

export interface IStaff {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  company?: Types.ObjectId;
  role: string;
  companyRole: string;
  dateOfBirth: string;
  resetPin: number;
}
