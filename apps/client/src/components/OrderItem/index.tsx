import { IndianRupee } from "lucide-react";
import { IOrder, IOrderItems } from "../../utils/types";

interface OrderItemProps {
  order: IOrder;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  return (
    <div
      key={order._id}
      className="md:h-[300px] h-auto md:w-[49%] sm:w-[48%] w-full border border-gray-200 shadow-md rounded-md "
    >
      <div className="md:flex h-[80%] px-5 py-3 gap-3">
        <div className="flex flex-col md:w-[50%] gap-2">
          <p className="font-medium md:text-lg text-[1rem] mb-2">Order Items</p>
          {order.orderItems.map((product: IOrderItems) => (
            <div key={product.id} className="flex gap-2 items-center">
              <div className="h-[50px] w-[50px] bg-slate-200 rounded-md flex items-center justify-center">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <p className="text-gray-700">
                {product.quantity} x{" "}
                <span className="text-neutral-900 font-medium">
                  {product.name}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:pt-0 pt-3 md:w-[50%] gap-1">
          <div className="gap-2 mb-2 flex items-center w-full">
            <p className="font-medium md:text-lg text-[1rem]">Shipping Info</p>
            <p className="bg-emerald-500 py-1 px-2 rounded-md text-white ml-auto">
              Delivered
            </p>
          </div>
          <p className="text-sm text-gray-700">
            Name:{" "}
            <span className="text-neutral-900 font-medium capitalize">
              {order.shippingInfo.name}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            Phone:{" "}
            <span className="text-neutral-900 font-medium">
              {order.shippingInfo.phoneNumber}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            Address:{" "}
            <span className="text-neutral-900 font-medium capitalize">
              {order.shippingInfo.address}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            City:{" "}
            <span className="text-neutral-900 font-medium capitalize">
              {order.shippingInfo.city}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            State:{" "}
            <span className="text-neutral-900 font-medium capitalize">
              {order.shippingInfo.state}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            Pincode:{" "}
            <span className="text-neutral-900 font-medium">
              {order.shippingInfo.pinCode}
            </span>
          </p>
          <p className="text-sm text-gray-700">
            Date:{" "}
            <span className="text-neutral-900 font-medium">
              {order.createdAt.slice(0, 10)}
            </span>
          </p>
        </div>
      </div>
      <div className="px-5 md:pt-4 pt-8 md:pb-2 h-auto mt-auto">
        <div className="flex justify-between">
          <p className=" text-base text-gray-700">
            OrderID:{" "}
            <span className="text-base font-medium text-neutral-900">
              {order.paymentInfo.id}
            </span>
          </p>
          <p className=" text-base text-gray-700 flex items-center gap-1">
            Total:{"  "}
            <span className="text-base font-medium text-neutral-900 flex items-center">
              <IndianRupee size={15} />
              {order.paymentInfo.totalPrice / 100}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
