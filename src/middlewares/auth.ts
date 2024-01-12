import Staff from "../models/staff.model";
import { NextFunction, Request, Response } from "express";
import response from "../utils/response";
import jwt from "jsonwebtoken";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Authorization header must start with 'Bearer '",
        status: "failure",
      });
    }

    const token = authorization.substring(7);
    const user: any = jwt.decode(token)!;
    const foundUser = await Staff.findOne({ _id: user._id });
    if (!foundUser) {
      return response.failure("user does not exist", 400);
    }

    if (foundUser.role !== "admin") {
      return res.status(400).json({
        message: "Only Admins Allowed",
        status: "failure",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export default { adminAuth };
