import { NextFunction, Request, Response } from "express";
import httpError from "http-errors";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { publicKeyAccessToken } from "../helpers/jwt";
import { Schema } from "mongoose";

export interface IRequest extends Request {
  userId?: Schema.Types.ObjectId;
}

interface JWTPayload {
  id: Schema.Types.ObjectId;
}

export const verifyToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) return next(httpError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    publicKeyAccessToken,
    (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return next(httpError.Unauthorized("Token expired"));
      } else {
        const payload = decoded as JWTPayload;
        if (payload && payload.id) {
          req.userId = payload.id;
          next();
        }
      }
    }
  );
};
