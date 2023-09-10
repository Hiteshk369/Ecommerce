import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Navbar, OrderItem, Spinner } from "../../components";
import axiosInstance from "../../libs/axios";
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
    <div className="h-screen md:w-screen w-full">
      <Navbar />
      <div className="h-full md:pt-28 pt-20 md:max-w-[1240px] max-w-[94%] m-auto">
        {isLoading && (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        )}
        <p className="md:text-3xl text-2xl font-semibold mb-6">Orders</p>
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
