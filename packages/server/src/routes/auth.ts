import express from "express";
import { signUp, login, resetPassword, logout } from "../controller/auth";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/resetPassword", resetPassword);
router.get("/logout", verifyToken, logout);

export default router;
