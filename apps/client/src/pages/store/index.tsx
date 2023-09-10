import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { Search } from "lucide-react";
import { ProductCard, Spinner, StoreLayout } from "../../components";
import axiosInstance from "../../libs/axios";
import { IProduct } from "../../utils/types";

const Store = () => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  const [searchText, setSearchText] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.post("/product/searchproduct", {
        name: searchText,
      });
      setSearchProducts(response.data.product);
    };
    const delay = 800;
    const debounce = setTimeout(() => {
      fetchData();
    }, delay);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchText]);

  const handleNavigate = (product: IProduct) => {
    navigate(`/store/${product.category}/${product._id}`);
    navigate(0);
  };

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
      {pathName === "/store" && (
        <div className="md:hidden flex relative">
          <input
            className="bg-lightGray p-2 rounded-lg sm:w-[80%] w-[90%] ml-auto mr-auto outline-none pl-6 text-neutral-800"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search className="absolute text-neutral-600 sm:right-24 right-10 top-2" />
          <div
            className={`${
              searchText
                ? "flex flex-col absolute sm:w-[80%] w-[90%] left-5 sm:left-16  h-auto bg-gray-200 top-11 rounded-md p-2 gap-2 z-[50]"
                : "hidden"
            }  `}
          >
            {searchProducts.length > 0 && searchProducts.length > 3
              ? searchProducts.slice(0, 3).map((product: IProduct) => (
                  <div
                    key={product._id}
                    className="flex w-full gap-3 bg-slate-100"
                  >
                    <img
                      className="w-16 h-16"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                ))
              : searchProducts.map((product: IProduct) => (
                  <div
                    key={product._id}
                    onClick={() => handleNavigate(product)}
                    className="flex w-full gap-3 bg-white cursor-pointer rounded-md px-5 py-2 items-center"
                  >
                    <img
                      className="w-16 h-16"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <p className="text-sm text-neutral-700">{product.name}</p>
                  </div>
                ))}
          </div>
        </div>
      )}
      <div className="md:px-4  mt-8 mb-10 pb-10">
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
