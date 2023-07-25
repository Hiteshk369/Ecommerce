import { Schema, model } from "mongoose";

const paymentStatus = ["Pending", "Paid", "Failed"] as const;
const deliveryStatus = ["Shipped", "Delivered", "Cancelled"] as const;

export interface IOrder {
  user: Schema.Types.ObjectId;
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    pinCode: number;
    phoneNo: number;
  };
  orderItems: [
    {
      name: string;
      price: number;
      quantity: number;
      image: string;
      product: Schema.Types.ObjectId;
    }
  ];
  paymentInfo: {
    id: string;
    orderDate: Date;
    paymentStatus: (typeof paymentStatus)[number];
    paymentDate: Date;
    itemsPrice: number;
    taxPrice: number;
    deliveryCharges: number;
    discount: number;
    totalPrice: number;
    deliveryStatus: (typeof deliveryStatus)[number];
    deliveryDate: Date | "Not Delivered";
  };
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      phoneNo: {
        type: Number,
        required: true,
      },
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      orderDate: {
        type: Date,
        default: () => new Date(Date.now()),
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: paymentStatus,
        default: "Paid",
        required: true,
      },
      paymentDate: {
        type: Date,
        default: () => new Date(Date.now()),
        required: true,
      },
      itemsPrice: {
        type: Number,
        required: true,
      },
      taxPrice: {
        type: Number,
        default: 40,
        required: true,
      },
      deliveryCharges: {
        type: Number,
        default: 30,
        required: true,
      },
      discount: {
        type: Number,
        default: 0,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      deliveryStatus: {
        type: String,
        enum: deliveryStatus,
        default: "Shipped",
        required: true,
      },
      deliveryDate: {
        type: Date,
        default: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
