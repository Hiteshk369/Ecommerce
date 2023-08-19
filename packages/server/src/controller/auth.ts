import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { encryptPassword, verifyPassword } from "../utils/passwordFunc";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import createHttpError from "http-errors";
import dotenv from "dotenv";
import { signJWT, verifyJWT } from "../utils/jwt";

dotenv.config();

//Signup
export const signUp = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    //check if the data is present
    if (!name || !email || !password)
      return next(createHttpError(401, "All fields are required"));

    const checkUser = await User.findOne({ email: email.toLowerCase() });

    //to check if a user already exists if not create a user
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

    //check if the data is present
    if (!email || !password)
      return next(createHttpError(401, "email and password is required"));

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("password admin");

    //to check if a user data is available, if yes: Login, no: Return an error
    if (user) {
      const hashedPassword = user.password as string;
      const passwordMatched = await verifyPassword(password, hashedPassword);
      if (passwordMatched) {
        const accessToken = signJWT({ email: email, id: user._id }, "8h");
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 43200000,
          sameSite: "lax",
        });
        res.status(200).json({ id: user._id, email, accessToken });
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
    res.cookie("accessToken", "", {
      maxAge: 0,
      httpOnly: true,
    });
    res.json({
      success: true,
      message: "User logged out",
    });
    res.redirect("/login");
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
