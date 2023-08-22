import { useQuery } from "react-query";
import { CirclesWithBar } from "react-loader-spinner";

import StoreLayout from "../../components/StoreLayout";
import ProductCard from "../../components/ProductCard";
import { getFetcher } from "../../libs/fetcher";
import { IProduct } from "../../utils/types";

const Store = () => {
  const fetchProductData = async () => {
    const result = await getFetcher(
      "http://localhost:5000/api/product/getproducts"
    );
    return result;
  };

  const { data, error, isLoading } = useQuery("productData", fetchProductData);
  return (
    <StoreLayout>
      <div className="px-4 mt-8 mb-10 pb-10">
        <div className="flex justify-center flex-wrap gap-5">
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
                wishlist={false}
              />
            ))}
        </div>
      </div>
    </StoreLayout>
  );
};

export default Store;
