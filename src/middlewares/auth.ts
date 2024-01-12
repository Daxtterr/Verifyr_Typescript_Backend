import Staff from "../models/staff.model";
import { NextFunction, Request, Response } from "express";
import response from "../utils/response";
import jwt from "jsonwebtoken";

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) {
      return response.failure("Authorization must start with bearer", 400);
    }

    // const token = auth.substring(7);
    // const user: any = jwt.decode(token)!;
    // const foundUser = await Staff.findOne({ _id: user._id });
    // if (!foundUser) {
    //   return response.failure("user does not exist", 400);
    // }

    // if (foundUser.role !== "admin") {
    //   return response.failure("only admins allowed", 400);
    // }

    next();
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export default { adminAuth };
