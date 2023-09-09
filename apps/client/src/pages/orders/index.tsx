import { useQuery } from "react-query";

import Navbar from "../../components/Navbar";
import OrderItem from "../../components/OrderItem";
import axiosInstance from "../../libs/axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IOrder } from "../../utils/types";

function Orders() {
  const navigate = useNavigate();
  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/order");
      return response.data;
    } catch (err) {
      toast.error("Login");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
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
              data.orders.map((order: IOrder) => (
                <OrderItem key={order._id} order={order} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
