import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { handleRefetchCartItems } from "../../libs/queryFunctions";
import Lottie from "lottie-react";
import failAnimation from "../../assets/failed.json";
import { Link } from "react-router-dom";

function Cancel() {
  const [scale, setScale] = useState(false);

  const handleEmptyCart = async () => {
    const response = await fetch(
      "http://localhost:5000/api/cart/deleteAllFromCart",
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (response.status === 400 || !result) {
      console.log("error");
    }
    handleRefetchCartItems();
    return result;
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
      <div className="h-full flex flex-col items-center justify-center max-w-[1240px] m-auto">
        <div
          className={`transition ${
            scale
              ? "transform translate-y-[-100px] duration-500 scale-[0.75]"
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
            scale ? "transform translate-y-[-100px] duration-500" : ""
          } `}
        >
          <p className="text-2xl">Order failed</p>
        </div>
        {scale && (
          <div className="flex flex-col items-center">
            <div
              className={`transition ${
                scale
                  ? "transform duration-[10000ms] translate-y-[-40px] scale-[1] opacity-100"
                  : "opacity-0"
              } `}
            >
              <p className="text-3xl">
                We are sorry for the issue. Try placing the order again.
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
