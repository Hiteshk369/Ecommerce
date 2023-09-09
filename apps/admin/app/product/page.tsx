import ProductModal from "@/components/ProductModal";
import { Plus } from "lucide-react";
import React from "react";

const Product = () => {
  return (
    <div className="w-full h-full px-14 py-8">
      <div className="w-[30%] py-4">
        <ProductModal />
      </div>
      <div className="flex flex-wrap gap-4 pt-4">
        <p className="text-3xl text-pearl font-medium">Products</p>
      </div>
    </div>
  );
};

export default Product;
