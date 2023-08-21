import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import createHttpError from "http-errors";
import asyncErrorHandler from "../middleware/asyncErrorHandler";
import { v4 as uuidv4 } from "uuid";
// import updateProductStock from "../utils/updateProductStock";
import { IRequest } from "../middleware/verifyToken";
//import Cart from "../models/Cart";

// create order
// export const createOrder = asyncErrorHandler(
//   async (req: IRequest, res: Response, next: NextFunction) => {
//     const { name, email, phoneNumber, address, city, state, pinCode } =
//       req.body.shippingInfo;
//     const userId = req.userId;
//     const cartItems = await Cart.find(
//       { userId: userId },
//       { product: 1, _id: 0 }
//     );

//     const orderId = uuidv4().split("-")[0];
//     const subTotal = cartItems.reduce((sum: number, product: any) => {
//       return sum + product.product.price * product.product.quantity;
//     }, 0);
//     const totalPrice = subTotal + 101 + 399;
//     const order = await Order.create({
//       shippingInfo: {
//         name,
//         email,
//         phoneNumber,
//         address,
//         city,
//         state,
//         pinCode,
//       },
//       orderItems: cartItems,
//       paymentInfo: {
//         id: orderId.toUpperCase(),
//         itemsPrice: subTotal,
//         totalPrice: totalPrice,
//       },
//       user: req.userId,
//     });

//     if (!order) next(createHttpError.InternalServerError);
//     else {
//       order.orderItems.forEach(async (order) => {
//         await updateProductStock(order.id, order.quantity);
//       });
//       res.status(201).json({
//         success: true,
//         message: "Product created successfully",
//         order,
//       });
//     }
//   }
// );

// get user orders
export const getUserOrders = asyncErrorHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const orders = await Order.find({ user: req.userId });
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
