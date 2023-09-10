import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import { Navbar } from "../../components";
import { handleRefetchCartItems } from "../../libs/queryFunctions";
import successAnimation from "../../assets/success.json";
import axiosInstance from "../../libs/axios";

function Success() {
  const [scale, setScale] = useState(false);

  const handleEmptyCart = async () => {
    const response = await axiosInstance.delete("/cart/deleteAllFromCart");
    if (response.status === 400 || !response.data) {
      console.log("error");
    }
    handleRefetchCartItems();
    return response.data;
  };

  useEffect(() => {
    handleEmptyCart();
    setTimeout(() => {
      setScale(true);
    }, 2000);
  });

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center md:max-w-[1240px] max-w-[94%] m-auto">
        <div
          className={`transition ${
            scale
              ? "transform md:translate-y-[-100px] translate-y-[-75px] duration-500 scale-[0.75]"
              : ""
          } `}
        >
          <Lottie
            animationData={successAnimation}
            style={{ height: 200 }}
            loop={false}
          />
        </div>
        <div
          className={`transition ${
            scale
              ? "transform md:translate-y-[-100px] translate-y-[-75px] duration-500"
              : ""
          } `}
        >
          <p className="md:text-2xl text-xl">Order successful</p>
        </div>
        {scale && (
          <div className="flex flex-col items-center w-full">
            <div
              className={`transition ${
                scale
                  ? "transform duration-[10000ms] translate-y-[-40px] scale-[1] opacity-100"
                  : "opacity-0"
              } `}
            >
              <p className="md:text-3xl text-lg w-full ">
                You will receive your order in 3-5 days.
              </p>
            </div>
            <Link
              to="/store"
              className="bg-darkBlue text-white px-4 py-3 rounded-lg hover:opacity-80 transition ease-in"
            >
              <p className="font-semibold ">Continue to Store</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Success;
