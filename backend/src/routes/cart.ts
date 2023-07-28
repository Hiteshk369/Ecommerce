import express from "express";
import verifyToken from "../middleware/verifyToken";
import { updateCart, viewCart } from "../controller/cart";

const router = express.Router();

router.post("/updateCart", verifyToken, updateCart);
router.get("/viewCart", verifyToken, viewCart);

export default router;
