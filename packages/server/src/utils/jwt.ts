import jwt from "jsonwebtoken";
import * as fs from "fs";
import { Schema } from "mongoose";

const privateKey = fs.readFileSync("./src/certs/private.pem", "utf-8");
const publicKey = fs.readFileSync("./src/certs/public.pem", "utf-8");

export const signJWT = (payload: object, expiresIn: string | number) => {
  return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
};

export const verifyJWT = (token: string) => {
  const decoded = jwt.verify(token, publicKey) as {
    id: Schema.Types.ObjectId;
  };
  return decoded.id;
};
