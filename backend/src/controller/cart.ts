import { Request, Response, NextFunction } from "express";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import Cart from "../models/Cart";
import { IRequest } from "../middleware/verifyToken";

export const updateCart = asyncErrorHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;
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
          { quantity: quantity },
          { new: true }
        );
        if (updateCart)
          res.status(200).json({
            success: true,
            updateCart,
          });
        else {
          const createCart = await Cart.create({ userId, productId, quantity });
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
      const cartItems = await Cart.find({ userId: userId }).populate([
        {
          path: "userId",
          select: "name",
        },
        { path: "productId", select: "name imageUrl price" },
      ]);
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
    console.log(userId);
    const { id } = req.params;

    await Cart.deleteOne({ userId, productId: id });
    res.status(200).json({
      success: true,
      message: "Product removed",
    });
    res.json({
      success: true,
      message: "Product deleted from cart",
    });
  }
);
