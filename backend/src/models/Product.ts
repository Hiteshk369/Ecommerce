import { Schema, model } from "mongoose";

const productCategories = ["Mobile", "Laptop", "Watch", "Headphone"] as const;

export interface IProduct {
  name: string;
  description: string;
  category: (typeof productCategories)[number];
  price: number;
  imageUrl: string;
  reviews: [
    {
      user: Schema.Types.ObjectId;
      name: string;
      rating: number;
      comment: string;
    }
  ];
  numOfReviews: number;
  stock: number;
  userId: Schema.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: productCategories,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
      maxLength: [6, "Product cannot exceed 8 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Product image is required"],
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
    numOfReviews: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      default: 1,
      maxLength: [4, "Stock cannot exceed 4 characters"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
