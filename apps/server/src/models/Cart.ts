import { Schema, model } from "mongoose";

export interface ICart {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  product: {
    id: Schema.Types.ObjectId;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  };
}

const cartSchema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id is required"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product Id is required"],
  },
  product: {
    id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
});

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
