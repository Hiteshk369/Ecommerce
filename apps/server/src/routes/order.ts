import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  getSingleUserOrder,
  getUserOrders,
  updateOrderById,
} from "../controller/order";
import verifyToken from "../middleware/verifyToken";
import verifyUserRole from "../middleware/verifyUserRole";

const router = express.Router();

// router.post("/neworder", verifyToken, createOrder);
router.get("/", verifyToken, getUserOrders);
router.get("/:id", verifyToken, getSingleUserOrder);
router.get("/admin/allorders", verifyToken, verifyUserRole, getAllOrders);
router.get("/admin/getorder/:id", verifyToken, verifyUserRole, getSingleOrder);
router.put("/admin/:id", verifyToken, verifyUserRole, updateOrderById);
router.delete("/admin/:id", verifyToken, verifyUserRole, deleteOrder);

export default router;
