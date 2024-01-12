import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const createCompanyValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    regNo: Joi.string().required(),
    website: Joi.string(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error: any) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const createStaffValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    role: Joi.string(),
    companyRole: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    company: Joi.string().hex().length(24),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error: any) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const adminLoginValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error: any) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const forgotPasswordValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error: any) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};

const resetPasswordValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    resetPin: Joi.string().required(),
    password: Joi.string().required(),
  });
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (error: any) {
    return res
      .status(400)
      .json({ status: "error", message: error.details[0].message });
  }
};
export default {
  createCompanyValidator,
  createStaffValidator,
  adminLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
