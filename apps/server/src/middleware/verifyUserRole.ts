import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import asyncErrorHandler from "./asyncErrorHandler";
import User from "../models/User";

const verifyUserRole = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.user.email });
    if (user?.admin) {
      next();
    } else {
      next(createHttpError.Unauthorized());
    }
  }
);

export default verifyUserRole;
