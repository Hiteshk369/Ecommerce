import express from "express";
import {
  createProduct,
  deleteAllProducts,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controller/product";
import verifyToken from "../middleware/verifyToken";
import verifyUserRole from "../middleware/verifyUserRole";

const router = express.Router();

router.post("/createproduct", verifyToken, verifyUserRole, createProduct);
router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);
router.put("/:id", verifyToken, verifyUserRole, updateProductById);
router.delete("/", verifyToken, verifyUserRole, deleteAllProducts);
router.delete("/:id", verifyToken, verifyUserRole, deleteProductById);

export default router;
