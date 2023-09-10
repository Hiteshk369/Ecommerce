import { useReducer } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Star,
  IndianRupee,
  Minus,
  Plus,
  Truck,
  ShoppingBag,
} from "lucide-react";

import { Spinner, StoreLayout } from "../../components";
import { handleRefetchCartItems } from "../../libs/queryFunctions";
import axiosInstance from "../../libs/axios";

const initialState = {
  counter: 0,
};
const reducer = (state: { counter: number }, action: { type: string }) => {
  switch (action.type) {
    case "increment":
      return { counter: state.counter + 1 };
    case "decrement":
      return { counter: state.counter - 1 };
    default:
      return { counter: state.counter };
  }
};

const Product = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { id } = useParams();
  const getProductDetails = async () => {
    const response = await axiosInstance.get(`/product/getproducts/${id}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    "productDetails",
    getProductDetails
  );

  const handleAddToCart = async (
    productId: string,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number
  ) => {
    const response = await axiosInstance.post("/cart/updatecart", {
      productId,
      product: {
        id: productId,
        name,
        price,
        imageUrl,
        quantity,
      },
    });
    if (response.status === 400 || !response.data) {
      toast.error("Product not added");
    } else {
      handleRefetchCartItems();
      toast.success("Added to cart");
    }
  };

  return (
    <StoreLayout>
      {isLoading && (
        <div className="ml-4 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="ml-4 h-full w-full flex justify-center items-center">
          <p className="text-xl text-neutral-700">Error retrieving products</p>
        </div>
      )}
      {data && (
        <div className="md:ml-20 md:px-0 px-5 md:pt-6 h-full w-full md:flex gap-4">
          <div className="md:w-[45%] flex flex-col">
            <div className="bg-lightGray md:w-[500px] md:h-[500px] w-full rounded-lg flex items-center">
              <img src={data?.product.imageUrl} alt={data?.product.name} />
            </div>
          </div>
          <div className="md:w-[45%] w-full flex flex-col">
            <div className="flex flex-col gap-2 pb-4 md:pt-0 pt-5">
              <p className="md:text-3xl text-2xl font-semibold">
                {data?.product.name}
              </p>
              <p className="md:text-sm text-[0.8rem] text-neutral-500 text-justify">
                {data?.product.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-12 h-8 bg-darkBlue flex items-center justify-center gap-1 rounded-md">
                  <p className="text-sm text-white">
                    {data?.product.numOfReviews}
                  </p>
                  <Star color="#fff" size={15} />
                </div>
                <p className="text-sm text-darkGray">
                  ({data?.product.reviews.length} Reviews)
                </p>
              </div>
            </div>
            <div className="flex md:pt-2 items-center gap-1">
              <IndianRupee strokeWidth={2.5} />
              <p className="md:text-2xl text-xl font-semibold">
                {data?.product.price}
              </p>
            </div>
            <div className="flex items-center md:pt-5 pt-2 gap-8">
              <div className="flex items-center md:h-10 h-8 md:w-32 w-28 justify-evenly bg-lightGray rounded-xl">
                <button
                  onClick={() => {
                    if (state.counter > 0) dispatch({ type: "decrement" });
                  }}
                >
                  <Minus strokeWidth={2.5} size={16} />
                </button>
                <p className="font-semibold">{state.counter}</p>
                <button onClick={() => dispatch({ type: "increment" })}>
                  <Plus strokeWidth={2.5} size={16} />
                </button>
              </div>
              <div className="w-40 md:text-xs text-[0.5rem] font-medium text-neutral-600">
                <p>
                  Only{" "}
                  <span className="text-lightOrange">
                    {data?.product.stock} items{" "}
                  </span>{" "}
                  left!
                </p>
                <p>Don't miss it</p>
              </div>
            </div>
            <div className="flex md:pt-6 pt-4 gap-5">
              <button className="bg-darkBlue md:w-[180px] w-[50%] md:py-2 py-1 text-white rounded-xl font-medium">
                <p>Buy Now</p>
              </button>
              <button
                onClick={() => {
                  if (state.counter >= 1) {
                    handleAddToCart(
                      data?.product._id,
                      data?.product.name,
                      data?.product.price,
                      data?.product.imageUrl,
                      state.counter
                    );
                  }
                }}
                className="border-2 border-darkBlue md:w-[180px] w-[50%] py-2 text-darkBlue rounded-xl font-medium"
              >
                Add to Cart
              </button>
            </div>
            <div className="md:w-[420px] flex flex-col mt-5  border border-lightGray">
              <div className=" border-b border-lightGray">
                <div className="px-6 py-3 space-y-1">
                  <div className="flex gap-2 items-center">
                    <Truck size={20} className="text-lightOrange" />
                    <p className="text-neutral-800 font-medium text-sm">
                      Fast Delivery
                    </p>
                  </div>
                  <p className="text-xs text-neutral-500 font-medium pl-7">
                    Delivery in 3days.
                  </p>
                </div>
              </div>
              <div className=" px-6 py-3 space-y-1 md:mb-0 mb-10">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={20} className="text-lightOrange" />
                  <p className="text-neutral-800 font-medium text-sm">
                    Return Delivery
                  </p>
                </div>
                <p className="text-xs text-neutral-500 font-medium pl-7">
                  Free 10days Delivery Returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </StoreLayout>
  );
};

export default Product;
