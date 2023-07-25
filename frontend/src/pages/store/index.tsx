import { useQuery } from "react-query";
import { getFetcher } from "../../libs/fetcher";

import StoreLayout from "../../components/StoreLayout";
import ProductCard from "../../components/ProductCard";

const Store = () => {
  const fetchProductData = async () => {
    const result = await getFetcher("http://localhost:5000/api/product");
    return result;
  };

  const { data, error, isLoading } = useQuery("productData", fetchProductData);

  if (isLoading) return <p>Loading</p>;

  return (
    <StoreLayout>
      <div className="px-4 mt-8 mb-10">
        <div className="flex justify-center flex-wrap gap-5">
          {isLoading && <p>Loading</p>}
          {error && <p>Error retrieving products</p>}
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

export default Store;
