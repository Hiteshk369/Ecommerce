import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import createHttpError from "http-errors";
import { v4 as uuidv4 } from "uuid";
import uploadImage from "../utils/uploadImage";

//create a product --Admin
export const createProduct = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { imageUrl } = req.body;
      const imageId = uuidv4().split("-")[0];

      const cloudImageUrl = await uploadImage(imageUrl, imageId);
      if (typeof cloudImageUrl != "string") {
        return next(createHttpError(500, "Unknown error"));
      }
      const product = await Product.create({
        ...req.body,
        imageUrl: cloudImageUrl,
      });
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(createHttpError(400, `${error}:Product not created`));
    }
  }
);

//get all products
export const getAllProducts = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      next(createHttpError(400, `${error}:Products not retrieved`));
    }
  }
);

//get product by Id
export const getProductById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await Product.findById({ _id: id });
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(createHttpError(400, `${error}:Product not retrieved`));
    }
  }
);

//get product by category
export const getProductByCategory = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = req.query.type;
    const products = await Product.find({ category: category });
    res.status(200).json({
      success: true,
      products,
    });
  }
);

//update a product --Admin
export const updateProductById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await Product.findById({ _id: id });
      if (!product) {
        next(createHttpError(400, "Product not found"));
      }
      const updateProduct = await Product.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      res.status(200).json({
        success: true,
        updateProduct,
      });
    } catch (error) {
      next(createHttpError(400, `${error}:Products not updated`));
    }
  }
);

//delete a product by Id --Admin
export const deleteProductById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const product = await Product.deleteOne({ _id: id });
      res.status(200).json({
        success: true,
        message: "Product deleted",
        product,
      });
    } catch (error) {
      next(createHttpError(400, `${error}:Product deletion failed`));
    }
  }
);

//delete all product --Admin
export const deleteAllProducts = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.deleteMany();
      res.status(200).json({
        success: true,
        message: "All products deleted",
        product,
      });
    } catch (error) {
      next(createHttpError(400, `${error}:Product deletion failed`));
    }
  }
);
