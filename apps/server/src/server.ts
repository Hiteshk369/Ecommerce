import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "./Database/db";

import auth from "./routes/auth";
import product from "./routes/product";
import order from "./routes/order";
import cart from "./routes/cart";
import stripe from "./routes/stripe";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(
  cors({
    origin: [
      "https://ecommerce-client-hiteshk369.vercel.app",
      "http://localhost:5173/",
      "http://localhost:5174/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/auth", auth);
app.use("/api/product", product);
app.use("/api/order", order);
app.use("/api/cart", cart);
app.use("/api/stripe", stripe);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch(console.log);
