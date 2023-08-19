import { ObjectId } from "mongoose";
import Product from "../models/Product";

const updateProductStock = async (productId: ObjectId, quantity: number) => {
  const product = await Product.findById({ _id: productId });
  if (product) {
    product.stock -= quantity;
    await product?.save({ validateBeforeSave: false });
  }
};

export default updateProductStock;
