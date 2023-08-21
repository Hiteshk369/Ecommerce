import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import Cart from "../models/Cart";
import { IRequest } from "../middleware/verifyToken";

export const updateCart = asyncErrorHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { productId } = req.body;
    const { name, price, imageUrl, quantity } = req.body.product;
    if (userId) {
      if (quantity === 0) {
        await Cart.deleteOne({ userId, productId });
        res.status(200).json({
          success: true,
          message: "Product removed",
        });
      } else {
        const updateCart = await Cart.findOneAndUpdate(
          { userId, productId },
          { product: { id: productId, name, price, imageUrl, quantity } },
          { new: true }
        );
        if (updateCart)
          res.status(200).json({
            success: true,
            updateCart,
          });
        else {
          const createCart = await Cart.create({
            userId,
            productId,
            product: { id: productId, name, price, imageUrl, quantity },
          });
          res.status(200).json({
            success: true,
            createCart,
          });
        }
      }
    } else {
      res.status(400).json({
        success: false,
        message: "User not logged in",
      });
    }
  }
);

export const viewCart = asyncErrorHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    if (userId) {
      const cartItems = await Cart.find({ userId: userId });
      res.status(200).json({
        success: true,
        cartItems,
      });
    }
  }
);

export const deleteProductFromCart = asyncErrorHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { id } = req.params;

    await Cart.deleteOne({ userId, productId: id });
    res.status(200).json({
      success: true,
      message: "Product removed",
    });
  }
);

export const deleteAllFromCart = asyncErrorHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    await Cart.deleteMany({ userId });
    res.status(200).json({
      success: true,
      message: "Cart empty",
    });
  }
);
