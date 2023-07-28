import { Schema, model } from "mongoose";

export interface ICart {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  quantity: number;
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
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
  },
});

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
