import { useQuery } from "react-query";
import axiosInstance from "../../libs/axios";

import StoreLayout from "../../components/StoreLayout";
import ProductCard from "../../components/ProductCard";
import { IProduct } from "../../utils/types";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Store = () => {
  const navigate = useNavigate();
  const fetchProductData = async () => {
    try {
      const response = await axiosInstance.get("/product/getproducts", {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      toast.error("Login");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const { data, error, isLoading } = useQuery("productData", fetchProductData);

  return (
    <StoreLayout>
      <div className="md:px-4 pl-3 md:pl-0 mt-8 mb-10 pb-10">
        <div className="w-full flex justify-center flex-wrap md:gap-5 gap-2">
          {isLoading && (
            <div className=" h-[500px] w-full flex justify-center items-center">
              <Spinner />
            </div>
          )}
          {error && (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-xl text-neutral-700">Error loading</p>
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
