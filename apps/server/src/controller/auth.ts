import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { encryptPassword, verifyPassword } from "../helpers/passwordFunc";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../helpers/jwt";

dotenv.config();

//Signup
export const signUp = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return next(createHttpError(401, "All fields are required"));

    const checkUser = await User.findOne({ email: email.toLowerCase() });

    if (!checkUser) {
      const hashedPassword = await encryptPassword(password);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const payload = user.toObject();
      delete payload.password;
      res.json(user);
    } else {
      next(createHttpError(409, "User already exists. Login to continue"));
    }
  }
);

//login
export const login = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(createHttpError(401, "email and password is required"));

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("password admin");

    if (user) {
      const hashedPassword = user.password as string;
      const passwordMatched = await verifyPassword(password, hashedPassword);
      if (passwordMatched) {
        const accessToken = signAccessToken(
          { email: email, id: user._id },
          "1h"
        );
        const refreshToken = signRefreshToken(
          { email: email, id: user._id },
          "7d"
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 43200000,
        });
        res
          .status(200)
          .json({ id: user._id, email, accessToken, refreshToken });
      } else {
        next(createHttpError(404, "Incorrect password"));
      }
    } else {
      next(createHttpError(404, "User not found"));
    }
  }
);

//logout
export const logout = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("refreshToken", "", {
      maxAge: 0,
      httpOnly: true,
    });
    res.json({
      success: true,
      message: "User logged out",
    });
  }
);

//reset password
export const resetPassword = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      next(createHttpError(404, "User not found"));
    } else {
      const hashedPassword = user.password as string;
      const passwordMatched = await verifyPassword(password, hashedPassword);
      if (passwordMatched) {
        const newHashedPassword = await encryptPassword(newPassword);
        await User.findOneAndUpdate(
          { email },
          {
            password: newHashedPassword,
          }
        );
        res.json({
          status: "Success",
          message: "Password updated successfully",
        });
      } else {
        next(createHttpError(404, "Incorrect Password"));
      }
    }
  }
);

//new refresh token
export const getRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies || req.body;
    if (!refreshToken)
      return next(createHttpError.Unauthorized("No refresh token"));
    const userId = verifyRefreshToken(refreshToken);
    console.log(userId);
    if (!userId) return next(createHttpError.Unauthorized("no user"));
    else {
      const user = await User.findOne({ _id: userId });
      if (!user) return next(createHttpError.Unauthorized("not found"));
      else {
        const accessToken = signAccessToken(
          { email: user.email, id: user.id },
          "1h"
        );
        const newRefreshToken = signRefreshToken(
          { email: user.email, id: user.id },
          "7d"
        );
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          maxAge: 43200000,
          sameSite: "lax",
        });
        res
          .status(200)
          .json({ accessToken: accessToken, refreshToken: newRefreshToken });
      }
    }
  } catch (error) {
    next(createHttpError.InternalServerError());
  }
};
