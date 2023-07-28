import StoreLayout from "../../components/StoreLayout";

import { useQuery } from "react-query";
import { getFetcher } from "../../libs/fetcher";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { CirclesWithBar } from "react-loader-spinner";

const ProductCategory = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const fetchProductByCategory = async (type: any) => {
    const category = type.queryKey[1];
    const result = await getFetcher(
      `http://localhost:5000/api/product/category?type=${category}`
    );
    console.log(result);
    return result;
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
            data?.products.map((product: any) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                image={product.imageUrl}
                category={product.category}
                wishlist={product.wishlist}
              />
            ))}
        </div>
      </div>
    </StoreLayout>
  );
};

export default ProductCategory;
