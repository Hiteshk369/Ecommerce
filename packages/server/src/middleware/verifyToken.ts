import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verifyJWT } from "../utils/jwt";
import { Schema } from "mongoose";

export interface IRequest extends Request {
  userId?: Schema.Types.ObjectId;
}

const verifyToken = (req: IRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) return next(createHttpError(400, "Access Denied"));

  try {
    const verified = verifyJWT(accessToken);
    if (verified) {
      req.userId = verified;
      console.log(verified);
      next();
    }
  } catch (error) {
    next(createHttpError(400, "Invalid request"));
  }
};

export default verifyToken;
