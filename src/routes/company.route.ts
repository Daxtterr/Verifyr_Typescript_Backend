import express, { Router } from "express";
import companyController from "../controllers/company.controller";
import inputValidator from "../middlewares/inputValidator";
import auth from "../middlewares/auth";
const router: Router = express.Router();

router.post(
  "/createcompany",
  inputValidator.createCompanyValidator,
  companyController.createCompany
);

router.post(
  "/createadmin",
  inputValidator.createStaffValidator,
  companyController.createAdmin
);

router.post(
  "/createuser",
  //inputValidator.createStaffValidator,
  auth.adminAuth,
  companyController.createUser
);

router.post(
  "/login",
  inputValidator.adminLoginValidator,
  companyController.adminLogin
);

router.post(
  "/forgotpassword",
  inputValidator.forgotPasswordValidator,
  companyController.forgotPassword
);

router.post(
  "/resetpassword",
  inputValidator.resetPasswordValidator,
  companyController.resetPassword
);

router.get("/allcompanies", companyController.getAllCompanies);

export default router;
