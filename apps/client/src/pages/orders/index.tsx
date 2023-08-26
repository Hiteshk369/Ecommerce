import { useQuery } from "react-query";

import Navbar from "../../components/Navbar";
import OrderItem from "../../components/OrderItem";
import axiosInstance from "../../libs/axios";

function Orders() {
  const fetchOrders = async () => {
    const response = await axiosInstance.get("http://localhost:5000/api/order");
    return response.data;
  };

  const { data, error, isLoading } = useQuery("orderItems", fetchOrders);

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-full pt-28 max-w-[1240px] m-auto">
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
