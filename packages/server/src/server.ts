import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";

import connectDB from "./Database/db";

import auth from "./routes/auth";
import product from "./routes/product";
import order from "./routes/order";
import cart from "./routes/cart";

const app = express();

const PORT = 5000;

app.use(morgan("combined"));
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
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

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch(console.log);
