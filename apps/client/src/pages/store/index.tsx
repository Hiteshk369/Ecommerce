import { useQuery } from "react-query";
import { CirclesWithBar } from "react-loader-spinner";
import axiosInstance from "../../libs/axios";

import StoreLayout from "../../components/StoreLayout";
import ProductCard from "../../components/ProductCard";
import { IProduct } from "../../utils/types";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const fetchProductData = async () => {
    const response = await axiosInstance.get("/product/getproducts", {
      withCredentials: true,
    });
    return response.data;
  };

  const { data, error, isLoading } = useQuery("productData", fetchProductData);

  return (
    <StoreLayout>
      <div className="px-4 mt-8 mb-10 pb-10">
        <div className="flex justify-center flex-wrap gap-5">
          {isLoading && (
            <div className=" h-[500px] w-full flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-xl text-neutral-700">
                Error retrieving products
              </p>
            </div>
          )}
          {data &&
            data?.products.map((product: IProduct) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                image={product.imageUrl}
                category={product.category}
              />
            ))}
        </div>
      </div>
    </StoreLayout>
  );
};

export default Store;
