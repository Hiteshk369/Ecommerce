import React from "react";
import { handleRefetchCartItems } from "../../libs/queryFunctions";
import toast from "react-hot-toast";
import { IndianRupee, Trash2 } from "lucide-react";
import axiosInstance from "../../libs/axios";

interface CartCardProps {
  item: any;
}

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const handleRemoveFromCart = async (productId: string) => {
    const response = await axiosInstance.delete(
      `http://localhost:5000/api/cart/deleteProductFromCart/${productId}`
    );
    handleRefetchCartItems();
    toast.success("Product Removed");
    return response.data;
  };
  return (
    <div key={item._id} className="flex  w-full">
      <div className="w-full flex gap-8 items-center">
        <button
          onClick={() => handleRemoveFromCart(item.product.id)}
          className="w-8 h-8 bg-rose-400 text-white rounded-md flex items-center justify-center"
        >
          <Trash2 size={18} />
        </button>
        <div className="w-[125px] h-[125px] flex justify-center items-center bg-slate-200 rounded-md">
          <img src={item.product.imageUrl} alt={item.product.name} />
        </div>
        <p className="text-xl font-medium text-neutral-800">
          {item.product.name}
        </p>
      </div>
      <div className="flex flex-col justify-center w-full">
        <div className="flex items-center ml-auto">
          <IndianRupee size={15} />
          <p className="font-medium text-lg">
            {item.product.price * item.product.quantity}
          </p>
        </div>
        <p className="ml-auto text-gray-600">
          Quantity:{" "}
          <span className="text-neutral-800 text-lg font-medium">
            {item.product.quantity}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartCard;
