import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import StoreLayout from "../../components/StoreLayout";
import ProductCard from "../../components/ProductCard";
import { IProduct } from "../../utils/types";
import axiosInstance from "../../libs/axios";
import Spinner from "../../components/Spinner";

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

  const { data, isLoading } = useQuery(
    ["productByCategory", type],
    fetchProductByCategory
  );

  return (
    <StoreLayout>
      <div className="ml-4 px-4 mt-8">
        {isLoading && (
          <div className=" h-[500px] w-full flex justify-center items-center">
            <Spinner />
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
              />
            ))}
        </div>
      </div>
    </StoreLayout>
  );
};

export default ProductCategory;
