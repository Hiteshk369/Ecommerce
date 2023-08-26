import jwt from "jsonwebtoken";
import * as fs from "fs";
import { Schema } from "mongoose";

const privateKeyAccessToken = fs.readFileSync(
  "./src/certs/accessTokenKeys/private.pem",
  "utf-8"
);
export const publicKeyAccessToken = fs.readFileSync(
  "./src/certs/accessTokenKeys/public.pem",
  "utf-8"
);

const privateKeyRefreshToken = fs.readFileSync(
  "./src/certs/refreshTokenKeys/private.pem",
  "utf-8"
);

export const publicKeyRefreshToken = fs.readFileSync(
  "./src/certs/refreshTokenKeys/public.pem",
  "utf-8"
);

export const signAccessToken = (
  payload: object,
  expiresIn: string | number
) => {
  return jwt.sign(payload, privateKeyAccessToken, {
    algorithm: "RS256",
    expiresIn,
  });
};

export const verifyAccessToken = (token: string) => {
  const decoded = jwt.verify(token, publicKeyAccessToken) as {
    id: Schema.Types.ObjectId;
  };
  return decoded.id;
};

export const signRefreshToken = (
  payload: object,
  expiresIn: string | number
) => {
  return jwt.sign(payload, privateKeyRefreshToken, {
    algorithm: "RS256",
    expiresIn,
  });
};

export const verifyRefreshToken = (token: string) => {
  const decoded = jwt.verify(token, publicKeyRefreshToken) as {
    id: Schema.Types.ObjectId;
  };
  return decoded.id;
};
