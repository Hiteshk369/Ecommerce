import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import {
  deleteAllFromCart,
  deleteProductFromCart,
  updateCart,
  viewCart,
} from "../controller/cart";

const router = express.Router();

router.post("/updateCart", verifyToken, updateCart);
router.get("/viewCart", verifyToken, viewCart);
router.delete("/deleteProductFromCart/:id", verifyToken, deleteProductFromCart);
router.delete("/deleteAllFromCart", verifyToken, deleteAllFromCart);

export default router;
