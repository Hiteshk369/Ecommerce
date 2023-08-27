import { useQuery } from "react-query";

import Navbar from "../../components/Navbar";
import OrderItem from "../../components/OrderItem";
import axiosInstance from "../../libs/axios";
import Spinner from "../../components/Spinner";

function Orders() {
  const fetchOrders = async () => {
    const response = await axiosInstance.get("/order");
    return response.data;
  };

  const { data, isLoading } = useQuery("orderItems", fetchOrders);

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-full pt-28 max-w-[1240px] m-auto">
        {isLoading && (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        )}
        <p className="text-3xl font-semibold mb-6">Orders</p>
        <div className="pb-16">
          <div className="flex flex-wrap gap-5">
            {data &&
              data.orders.map((order: any) => (
                <OrderItem key={order._id} order={order} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
