import companyService from "../services/company.service";

import { Response, Request } from "express";

const createCompany = async (req: Request, res: Response) => {
  try {
    const response = await companyService.createCompany(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create company",
      status: "failure",
    });
  }
};

const createAdmin = async (req: Request, res: Response) => {
  try {
    const response = await companyService.createAdmin(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create admin",
      status: "failure",
    });
  }
};

const adminLogin = async (req: Request, res: Response) => {
  try {
    const response = await companyService.adminLogin(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to login admin",
      status: "failure",
    });
  }
};
const createUser = async (req: Request, res: Response) => {
  try {
    const response = await companyService.createUser(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create user",
      status: "failure",
    });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const response = await companyService.forgotPassword(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create reset pin",
      status: "failure",
    });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const response = await companyService.resetPassword(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update password",
      status: "failure",
    });
  }
};

const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const response = await companyService.getAllCompanies();
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "unable to get companies",
      status: "failure",
    });
  }
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
