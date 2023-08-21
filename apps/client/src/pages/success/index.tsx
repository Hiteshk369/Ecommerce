import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import successAnimation from "../../assets/success.json";
import Navbar from "../../components/Navbar";
import { handleRefetchCartItems } from "../../libs/queryFunctions";

function Success() {
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
              ? "transform translate-y-[-200px] duration-500 scale-[0.75]"
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
            scale ? "transform translate-y-[-200px] duration-500 scale-1" : ""
          } `}
        >
          <p>Order Successful</p>
        </div>
      </div>
    </div>
  );
}

export default Success;
