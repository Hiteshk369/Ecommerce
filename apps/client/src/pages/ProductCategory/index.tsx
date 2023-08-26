import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";

import StoreLayout from "../../components/StoreLayout";
import ProductCard from "../../components/ProductCard";
import { IProduct } from "../../utils/types";
import axiosInstance from "../../libs/axios";

const ProductCategory = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const fetchProductByCategory = async (type: any) => {
    const category = type.queryKey[1];
    const response = await axiosInstance.get(
      `http://localhost:5000/api/product/category?type=${category}`
    );

    return response.data;
  };

  const { data, isLoading, error } = useQuery(
    ["productByCategory", type],
    fetchProductByCategory
  );

  return (
    <StoreLayout>
      <div className="ml-4 px-4 mt-8">
        {isLoading && (
          <div className=" h-full w-full flex justify-center items-center">
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
        <div className="flex flex-wrap justify-center gap-5">
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
                wishlist={true}
              />
            ))}
        </div>
      </div>
    </StoreLayout>
  );
};

export default ProductCategory;
