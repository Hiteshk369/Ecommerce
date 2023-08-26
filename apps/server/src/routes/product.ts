import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProductById,
  getAllProducts,
  getProductByCategory,
  getProductById,
  updateProductById,
} from "../controller/product";
import { verifyToken } from "../middleware/verifyToken";
import verifyUserRole from "../middleware/verifyUserRole";

const router = express.Router();

router.post("/createProduct", verifyToken, verifyUserRole, createProduct);
router.get("/getProducts", verifyToken, getAllProducts);
router.get("/getProducts/:id", verifyToken, getProductById);
router.get("/category", verifyToken, getProductByCategory);
router.put(
  "/updateproduct/:id",
  verifyToken,
  verifyUserRole,
  updateProductById
);
router.delete("/deleteproduct", verifyToken, verifyUserRole, deleteAllProducts);
router.delete(
  "/deleteproduct/:id",
  verifyToken,
  verifyUserRole,
  deleteProductById
);

export default router;
