import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import { Navbar } from "../../components";
import { handleRefetchCartItems } from "../../libs/queryFunctions";
import failAnimation from "../../assets/failed.json";
import axiosInstance from "../../libs/axios";

function Cancel() {
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
            animationData={failAnimation}
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
          <p className="text-2xl">Order failed</p>
        </div>
        {scale && (
          <div className="flex flex-col items-center">
            <div
              className={`transition ${
                scale
                  ? "transform duration-[10000ms] md:translate-y-[-40px] translate-y-[-40px] scale-[1] opacity-100"
                  : "opacity-0"
              } `}
            >
              <p className="md:text-3xl text-lg">
                Try placing the order again.
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

export default Cancel;
