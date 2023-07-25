import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verifyJWT } from "../utils/jwt";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) return next(createHttpError(400, "Access Denied"));

  try {
    const verified = verifyJWT(accessToken);
    if (verified) {
      req.body.user = verified.payload;
      next();
    }
  } catch (error) {
    next(createHttpError(400, "Invalid request"));
  }
};

export default verifyToken;
