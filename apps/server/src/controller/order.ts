import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import createHttpError from "http-errors";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { IRequest } from "../middleware/verifyToken";

// get user orders
export const getUserOrders = asyncErrorHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const orders = await Order.find({ user: req.userId }).sort({
      updatedAt: -1,
    });
    if (!orders) next(createHttpError(400, "Failed to fetch orders"));
    res.status(200).json({
      success: true,
      orders,
    });
  }
);

//get single user order
export const getSingleUserOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findById({ _id: id });
    if (!order) next(createHttpError(400, "Failed to fetch order"));
    res.status(200).json({
      success: true,
      order,
    });
  }
);

//get all orders --Admin
export const getAllOrders = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders,
    });
  }
);

//get single order details --Admin
export const getSingleOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findById({ _id: id }).populate(
      "user",
      "name email"
    );
    if (!order) next(createHttpError(400, "Failed to fetch order"));
    res.status(200).json({
      success: true,
      order,
    });
  }
);

//update order --Admin
export const updateOrderById = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;
    delete body.user;
    const order = await Order.findById({ _id: id }).populate(
      "user",
      "name email"
    );
    if (!order) next(createHttpError(400, "Failed to fetch order"));
    else {
      if (
        order.paymentInfo.deliveryStatus === "Delivered" ||
        order.paymentInfo.deliveryStatus === "Cancelled"
      )
        return next(createHttpError(400, "Order cannot be updated"));

      // if (req.body.paymentInfo.deliveryStatus === "Shipped") {
      //   order?.orderItems.forEach((order) => {
      //     updateProductStock(order.product, order.quantity);
      //   });
      // }

      if (req.body.paymentInfo.deliveryStatus === "Delivered") {
        order.paymentInfo.deliveryStatus = "Delivered";
        order.paymentInfo.deliveryDate = new Date(Date.now());
      }

      if (req.body.paymentInfo.deliveryStatus === "Cancelled") {
        order.paymentInfo.paymentStatus = "Failed";
        order.paymentInfo.deliveryDate = "Not Delivered";
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        order,
      });
    }
  }
);

//delete order by Id --Admin
export const deleteOrder = asyncErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      order,
    });
  }
);
