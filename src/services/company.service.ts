import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ICompany, IStaff } from "../@types/types";
import Company from "../models/company.model";
import Staff from "../models/staff.model";
import response from "../utils/response";
import generateResetPin from "../utils/generateResetPin";
import sendResetPinMail from "../utils/sendForgotPasswordMail";

const createCompany = async (payload: ICompany) => {
  const { name, email, phoneNumber, regNo } = payload;

  const foundName = await Company.findOne({ name: name });
  if (foundName) {
    return response.failure("Company already exist", 400);
  }

  const foundEmail = await Company.findOne({ email: email });
  if (foundEmail) {
    return response.failure("Email already exists", 400);
  }

  const foundPhoneNumber = await Company.findOne({ phoneNumber: phoneNumber });
  if (foundPhoneNumber) {
    return response.failure("Number already exists", 400);
  }

  const foundRegNo = await Company.findOne({ regNo: regNo });
  if (foundRegNo) {
    return response.failure("Registration Number already exists", 400);
  }

  const newCompany = await Company.create(payload);
  return response.success("Company created", 200, newCompany);
};

const createAdmin = async (payload: IStaff) => {
  const { phoneNumber, email } = payload;

  const foundUser = await Staff.findOne({
    $or: [{ phoneNumber: phoneNumber }, { email: email }],
  });
  if (foundUser) {
    return response.failure("Phone Number or Email already exists", 400);
  }

  const generatedSalt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);
  payload.password = hashedPassword;
  payload.role = "admin";

  const newAdmin = await Staff.create(payload);
  return response.success("Admin Created", 201, newAdmin);
};

const adminLogin = async (payload: IStaff) => {
  const { email } = payload;
  const foundUser = await Staff.findOne({ email: email });
  if (!foundUser) {
    return response.failure("User not found", 400);
  }

  const passwordMatch = await bcrypt.compare(
    payload.password,
    foundUser.password
  );

  if (!passwordMatch) {
    return response.failure("password does not match", 400);
  }

  const accessToken = jwt.sign(
    { email: foundUser.email, _id: foundUser._id },
    <string>process.env.SECRET_KEY
  );

  return response.success("Login succesful", 200, { accessToken });
};
const createUser = async (payload: IStaff) => {
  const { phoneNumber, email } = payload;

  const foundUser = await Staff.findOne({
    $or: [{ phoneNumber: phoneNumber }, { email: email }],
  });
  if (foundUser) {
    return response.failure("Phone Number or Email already exists", 400);
  }

  const newUser = await Staff.create(payload);
  return response.success("User Created", 201, newUser);
};

const forgotPassword = async (payload: IStaff) => {
  const { email } = payload;
  const foundUser = await Staff.findOne({ email: email });
  if (!foundUser) {
    return response.failure("user does not exist", 400);
  }
  const resetPin = generateResetPin();

  const updatedUser = await Staff.findByIdAndUpdate(
    { _id: foundUser._id },
    { resetPin: resetPin },
    { new: true }
  );

  const mailPayload = {
    to: updatedUser!.email,
    subject: "Reset Pin",
    pin: resetPin,
  };
  sendResetPinMail(mailPayload);
  return response.success("Reset pin sent to mail", 200, updatedUser);
};

const resetPassword = async (payload: IStaff) => {
  const { email, resetPin } = payload;

  const foundUser = await Staff.findOne({ email: email, resetPin: resetPin });
  if (!foundUser) {
    return response.failure("user does not exist", 400);
  }
  const generatedSalt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
  const hashedPassword = await bcrypt.hash(payload.password, generatedSalt);

  const updatedUser = await Staff.findByIdAndUpdate(
    { _id: foundUser._id },
    { password: hashedPassword, resetPin: null },
    { new: true }
  );

  return response.success("password successfully updated", 200, updatedUser);
};

const getAllCompanies = async () => {
  const allCompanies = await Company.find({});
  if (!allCompanies) {
    return response.failure("failed", 400);
  }
  const companyCount = allCompanies.length;
  return response.success(
    `${companyCount} companies available`,
    200,
    allCompanies
  );
};

export default {
  createCompany,
  createAdmin,
  createUser,
  forgotPassword,
  adminLogin,
  resetPassword,
  getAllCompanies,
};
