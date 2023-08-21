import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { IRequest } from "../middleware/verifyToken";
import Order from "../models/Order";
import { v4 as uuidv4 } from "uuid";
import { ObjectId } from "mongoose";

dotenv.config();
const router = express.Router();

const stripe = new Stripe(
  "sk_test_51NhSN3SGfXUgaiKh17GxqTcQJ7yrnYueTJE4eVXrwWaBg3ObNRfviqKZIBcG2zVBtJMzKUW8AoRDRHjyy5cWirpZ00ubiDIXki",
  {
    apiVersion: "2023-08-16",
  }
);

const createOrder = async (customer: any, data: any) => {
  const cartItems = JSON.parse(customer.metadata.cart);
  const orderId = uuidv4().split("-")[0];
  const newOrder = new Order({
    shippingInfo: {
      name: data.customer_details.name,
      email: data.customer_details.email,
      phoneNumber: data.customer_details.phone,
      address: data.customer_details.address.line1,
      city: data.customer_details.address.city,
      state: data.customer_details.address.state,
      pinCode: data.customer_details.address.postal_code,
    },
    orderItems: cartItems,
    paymentInfo: {
      id: orderId,
      itemsPrice: data.amount_subtotal,
      totalPrice: data.amount_total,
    },
  });
  try {
    const savedOrder = await newOrder.save();
    console.log("Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

router.post("/create-checkout-session", async (req: IRequest, res) => {
  const { cartItems } = req.body;
  const id = req.userId;
  const cartProducts: any = [];
  cartItems.map((item: any) => {
    cartProducts.push(item.product);
  });

  const customer = await stripe.customers.create({
    metadata: {
      userId: String(id),
      cart: JSON.stringify(cartProducts),
    },
  });

  const line_items = cartItems.map((item: any) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product.name,
          images: [item.product.imageUrl],
          metadata: {
            id: item.product.id,
          },
        },
        unit_amount: item.product.price * 100,
      },
      quantity: item.product.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    customer: customer.id,
    phone_number_collection: {
      enabled: true,
    },
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: "http://localhost:4242/cancel",
  });

  res.send({ url: session.url });
});

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret =
//   "whsec_632627b4967a3b1da83a7de52a608b673e7622193bc764b540f4fd430ec75cb6";
let endpointSecret: string;
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request: IRequest, response) => {
    const sig: any = request.headers["stripe-signature"];

    let data: any;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        );
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = request.body.data.object;
      eventType = request.body.type;
    }

    if (eventType === "checkout.session.completed") {
      stripe.customers.retrieve(data.customer).then((customer) => {
        console.log(customer);
        console.log("data:", data);
      });
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

export default router;
