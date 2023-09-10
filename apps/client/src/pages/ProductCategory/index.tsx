import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { ProductCard, Spinner, StoreLayout } from "../../components";
import { IProduct } from "../../utils/types";
import axiosInstance from "../../libs/axios";

const ProductCategory = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const fetchProductByCategory = async (type: any) => {
    const category = type.queryKey[1];
    const response = await axiosInstance.get(
      `/product/category?type=${category}`
    );

    return response.data;
  };

  const { data, error, isLoading } = useQuery(
    ["productByCategory", type],
    fetchProductByCategory
  );

  return (
    <StoreLayout>
      <div className="md:px-4  mt-8 mb-10 pb-10">
        <div className="w-full flex justify-center flex-wrap md:gap-5 gap-2">
          {isLoading && (
            <div className="h-[500px] w-full flex justify-center items-center">
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

export default ProductCategory;
