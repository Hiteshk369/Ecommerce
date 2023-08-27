import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar";
import { useAppSelector } from "../../libs/hooks";
import { ICartItems } from "../../utils/types";
import emptyCart from "../../assets/emptyCart.jpg";
import CartCard from "../../components/CartCard";
import axiosInstance from "../../libs/axios";
import Spinner from "../../components/Spinner";

const Cart = () => {
  const user = useAppSelector((state) => state.user.token);
  const userId = useAppSelector((state) => state.user.id);

  const fetchCartItems = async () => {
    const response = await axiosInstance.get("/cart/viewcart");
    return response.data;
  };

  const { data, isLoading } = useQuery("cartItems", fetchCartItems);

  const subTotal = data?.cartItems.reduce(
    (sum: number, product: ICartItems) => {
      return sum + product.product.price * product.product.quantity;
    },
    0
  );

  const placeOrder = async (cartItems: any, userId: any) => {
    try {
      const response = await axiosInstance.post(
        "/stripe/create-checkout-session",
        {
          cartItems,
          userId,
        }
      );
      window.location.href = response.data.url;
    } catch (err) {
      toast.error("Try again");
    }
  };

  return (
    <main className="w-screen h-screen">
      <Navbar />
      <section className="pt-24 w-full h-full">
        <div className="max-w-[1240px] h-full m-auto flex gap-4">
          {isLoading && (
            <div className="flex w-full h-full items-center justify-center">
              <Spinner />
            </div>
          )}
          {data && data.cartItems.length !== 0 ? (
            <>
              <div className="h-[90%] w-[70%] border border-gray-300 rounded-md">
                <div className="p-4">
                  <p className="text-2xl text-neutral-800 font-medium pb-4">
                    Review Items
                  </p>
                  <div className="flex flex-col gap-2">
                    {data.cartItems.map((item: any) => (
                      <CartCard key={item._id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-[30%] border border-gray-300 rounded-md">
                <div className="p-4">
                  <p className="text-2xl text-neutral-800 font-medium pb-4">
                    Payment Info
                  </p>
                  <div className="flex flex-col gap-1 py-3 ">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700">Subtotal</p>
                      <p className="font-medium">{subTotal}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700">Tax</p>
                      <p className="text-gray-700 font-medium">+ 399</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700">Shipment cost</p>
                      <p className="text-gray-700 font-medium">+ 101</p>
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
                    className="mt-8 w-full flex items-center justify-center bg-darkBlue py-2 rounded-md hover:opacity-90 transition ease-in-out duration-200"
                  >
                    <p className="text-white font-medium">
                      Continue to payment
                    </p>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex w-full h-full items-center justify-center">
              <div className="flex flex-col justify-center items-center">
                <div className="h-[400px] w-[400px]">
                  <img src={emptyCart} alt="emptyCart" />
                </div>
                <p className="text-2xl text-neutral-800 font-medium mt-3">
                  Your Ecommerce cart is empty, continue shopping.
                </p>
                <Link
                  to="/store"
                  className="bg-darkBlue px-3 py-2 rounded-md text-white my-8 hover:opacity-80 transition ease-in-out"
                >
                  Continue to store
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Cart;
