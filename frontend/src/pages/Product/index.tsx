import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  Star,
  IndianRupee,
  Minus,
  Plus,
  Truck,
  ShoppingBag,
} from "lucide-react";

import { getFetcher } from "../../libs/fetcher";
import StoreLayout from "../../components/StoreLayout";
import { CirclesWithBar } from "react-loader-spinner";

const Product = () => {
  const { id } = useParams();
  const getProductDetails = async () => {
    const result = await getFetcher(
      `http://localhost:5000/api/product/getproducts/${id}`
    );
    return result;
  };

  const { data, isLoading, error } = useQuery(
    "productDetails",
    getProductDetails
  );
  console.log(data);
  return (
    <StoreLayout>
      {isLoading && (
        <div className="ml-4 h-full w-full flex justify-center items-center">
          <CirclesWithBar
            height="100"
            width="100"
            color="#2763ff"
            visible={true}
            outerCircleColor="#2763ff"
            innerCircleColor="#2763ff"
            barColor="#2763ff"
            ariaLabel="circles-with-bar-loading"
          />
        </div>
      )}
      {error && (
        <div className="ml-4 h-full w-full flex justify-center items-center">
          <p className="text-xl text-neutral-700">Error retrieving products</p>
        </div>
      )}
      {data && (
        <div className="ml-4 pt-6 h-full w-full flex gap-4">
          <div className="w-[45%] flex flex-col">
            <div className="bg-lightGray w-[500px] h-[500px] rounded-lg flex items-center">
              <img src={data?.product.imageUrl} alt={data?.product.name} />
            </div>
          </div>
          <div className="w-[45%] flex flex-col">
            <div className="flex flex-col gap-2 pb-4">
              <p className="text-3xl font-semibold">{data?.product.name}</p>
              <p className="text-sm text-neutral-500 text-justify">
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
            <div className="flex pt-2 items-center gap-1">
              <IndianRupee strokeWidth={2.5} />
              <p className="text-2xl font-semibold">{data?.product.price}</p>
            </div>
            <div className="flex items-center pt-5 gap-8">
              <div className="flex items-center h-10 w-32 justify-evenly bg-lightGray rounded-3xl">
                <Minus strokeWidth={2.5} size={16} />
                <p className="font-semibold">1</p>
                <Plus strokeWidth={2.5} size={16} />
              </div>
              <div className="w-40 text-xs font-medium text-neutral-600">
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
            <div className="flex pt-6 gap-5">
              <button className="bg-darkBlue w-[180px] py-2 text-white rounded-3xl font-medium">
                <p>Buy Now</p>
              </button>
              <button className="border-2 border-darkBlue w-[180px] py-2 text-darkBlue rounded-3xl font-medium">
                Add to Cart
              </button>
            </div>
            <div className="w-[420px] flex flex-col mt-5  border border-lightGray">
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
              <div className=" px-6 py-3 space-y-1">
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
