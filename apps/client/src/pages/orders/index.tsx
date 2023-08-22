import React from "react";
import Navbar from "../../components/Navbar";

function Orders() {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center max-w-[1240px] m-auto">
        <p>Orders</p>
      </div>
    </div>
  );
}

export default Orders;
