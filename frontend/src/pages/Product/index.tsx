import { useQuery } from "react-query";
import { getFetcher } from "../../libs/fetcher";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const getProductDetails = async () => {
    const result = await getFetcher(`http://localhost:5000/api/product/:${id}`);
    return result;
  };

  const { data, isLoading, error } = useQuery(
    "productDetails",
    getProductDetails
  );
  if (isLoading) return <p>loading</p>;
  console.log(data);
  return <div>Product</div>;
};

export default Product;
