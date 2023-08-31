import express from "express";
import {
  signUp,
  login,
  resetPassword,
  logout,
  getRefreshToken,
} from "../controller/auth";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/resetPassword", resetPassword);
router.get("/refresh", getRefreshToken);
router.get("/logout", verifyToken, logout);

//mobile
router.post("/refresh", getRefreshToken);

export default router;
