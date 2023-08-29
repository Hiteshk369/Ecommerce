import { NextFunction, Request, Response } from "express";
import httpError from "http-errors";
import jwt from "jsonwebtoken";
import { publicKeyAccessToken } from "../helpers/jwt";
import { Schema } from "mongoose";

export interface IRequest extends Request {
  userId?: Schema.Types.ObjectId;
}

export const verifyToken = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) return next(httpError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, publicKeyAccessToken) as {
    id: Schema.Types.ObjectId;
  };
  if (!payload){
    return next(httpError.Unauthorized());
  }
  req.userId = payload.id;
  next();
};
