import FormInput from "../../components/FormInput";
import Navbar from "../../components/Navbar";
import { Trash2 } from "lucide-react";

import { useQuery } from "react-query";
import { fetcher, getFetcher } from "../../libs/fetcher";
import { handleRefetchCartItems } from "../../libs/queryFunctions";
import { ICartItems } from "../../utils/types";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "../../libs/hooks";

const Cart = () => {
  const user = useAppSelector((state) => state.user.token);
  const userId = useAppSelector((state) => state.user.id);
  const orderFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Name cannot be less than 3 characters" })
      .max(36),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    phoneNumber: z.string(),
    address: z
      .string()
      .min(3, { message: "address cannot be less than 5 characters" })
      .max(36),
    city: z
      .string()
      .min(3, { message: "city cannot be less than 5 characters" })
      .max(36),
    state: z
      .string()
      .min(3, { message: "state cannot be less than 5 characters" })
      .max(36),
    pinCode: z.string(),
  });

  type formSchemaType = z.infer<typeof orderFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formSchemaType>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
    },
  });

  const fetchCartItems = async () => {
    const response = await getFetcher(
      "http://localhost:5000/api/cart/viewcart"
    );
    return response;
  };

  const { data } = useQuery("cartItems", fetchCartItems);

  const subTotal = data?.cartItems.reduce(
    (sum: number, product: ICartItems) => {
      return sum + product.product.price * product.product.quantity;
    },
    0
  );

  const handleRemoveFromCart = async (productId: string) => {
    const response = await fetch(
      `http://localhost:5000/api/cart/deleteProductFromCart/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    handleRefetchCartItems();
    toast.success("Product Removed");
    return response;
  };

  const placeOrder = async (cartItems: any, userId: any) => {
    const response = await fetcher(
      "http://localhost:5000/api/stripe/create-checkout-session",
      {
        cartItems,
        userId,
      }
    );
    const result = await response.json();
    if (response.status === 400 || !result) {
      toast.error("Failed");
    } else {
      window.location.href = result.url;
    }
  };

  return (
    <main className="w-screen h-screen">
      <Navbar />
      <section className="pt-24 w-full h-full">
        <div className="max-w-[1200px] m-auto flex gap-4">
          <div className="w-[60%] h-full gap-4">
            <div className="w-full h-full border border-lightGray rounded-md px-4 pt-4 pb-8 flex flex-col gap-2">
              <p className="text-xl font-medium pt-2 pb-4">
                Delivery Information
              </p>
              <FormInput
                id="fullName"
                label="Full Name"
                placeholderText="Enter your full name"
                required
                register={register("name")}
                errors={errors}
              />
              <div className="flex w-full gap-4">
                <FormInput
                  id="email"
                  label="Email"
                  placeholderText="Enter your email id"
                  required
                  register={register("email")}
                  errors={errors}
                />
                <FormInput
                  id="phoneNumber"
                  label="Phone number"
                  placeholderText="Enter your phone number"
                  required
                  register={register("phoneNumber")}
                  errors={errors}
                />
              </div>
              <FormInput
                id="address"
                label="Address"
                placeholderText="Enter your address"
                required
                register={register("address")}
                errors={errors}
              />
              <div className="flex w-full gap-4">
                <FormInput
                  id="city"
                  label="City"
                  placeholderText="Enter your city"
                  required
                  register={register("city")}
                  errors={errors}
                />
                <FormInput
                  id="state"
                  label="State"
                  placeholderText="Enter your state"
                  required
                  register={register("state")}
                  errors={errors}
                />
                <FormInput
                  id="pinCode"
                  label="Pin code"
                  placeholderText="Enter your pin code"
                  required
                  register={register("pinCode")}
                  errors={errors}
                />
              </div>
            </div>
          </div>
          <div className="w-[35%] h-full border border-lightGray rounded-md px-4 py-2">
            <p className="text-xl font-medium pt-2 pb-3">Order Summary</p>
            <div className="h-[260px] overflow-y-scroll flex flex-col gap-2 scrollbar-hide scroll-smooth">
              {data &&
                data.cartItems.map((item: ICartItems) => (
                  <div
                    key={item._id}
                    className="flex bg-lightGray px-4 relative"
                  >
                    <button
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      className="absolute w-6 h-6 bg-red-500 flex items-center justify-center rounded-full left-0 cursor-pointer"
                    >
                      <Trash2 color="#fff" size={12} />
                    </button>
                    <div className="h-[100px] w-[100px] overflow-hidden">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                      />
                    </div>
                    <div className="ml-auto flex flex-col justify-center">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="ml-auto text-sm">
                        Price :{" "}
                        <span className="font-medium">
                          {item.product.quantity * item.product.price}
                        </span>
                      </p>
                      <p className="ml-auto text-sm">
                        Quantity :{" "}
                        <span className="font-medium">
                          {item.product.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-1 py-3 border-b border-lightGray">
              <div className="flex items-center justify-between">
                <p className="text-darkGray">Subtotal</p>
                <p className="font-medium">{subTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-darkGray">Tax</p>
                <p className="text-darkGray font-medium">+ 399</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-darkGray">Shipment cost</p>
                <p className="text-darkGray font-medium">+ 101</p>
              </div>
            </div>
            <div className="pt-3 flex justify-between">
              <p className="font-medium">Grand total</p>
              <p className="font-medium">{subTotal + 399 + 101}</p>
            </div>
            <button
              onClick={() =>
                user
                  ? placeOrder(data?.cartItems, userId)
                  : toast.error("Login")
              }
              className="mt-4 mb-3 w-full flex items-center justify-center bg-darkBlue py-2 rounded-md"
            >
              <p className="text-white font-medium">Continue to payment</p>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
