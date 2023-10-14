"use client";
import ProductModal from "@/components/ProductModal";
import React from "react";
import ProductData from "../../../../../../eCommerce.products.json";
import { IProduct } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Sliders } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const Product = () => {
  const filterOptions = [
    {
      id: 1,
      name: "All Products",
      active: true,
    },
    {
      id: 2,
      name: "Mobiles",
      active: false,
    },
    {
      id: 3,
      name: "Laptops",
      active: false,
    },
    {
      id: 4,
      name: "Watches",
      active: false,
    },
    {
      id: 5,
      name: "Headphones",
      active: false,
    },
  ];
  return (
    <div className="w-full h-full px-14 py-8 overflow-y-scroll">
      <div className="w-[30%] py-4">
        <ProductModal />
      </div>
      <div className="w-full h-full mt-4">
        <p className="text-3xl text-pearl font-medium">Products</p>
        <div className="flex gap-4 my-4 items-center">
          <div className="flex gap-1 items-center">
            <Sliders size={15} />
            <p className="text-lg text-neutral-300 font-medium">Filter by:</p>
          </div>
          {filterOptions.map((filter) => (
            <div
              key={filter.id}
              className={twMerge(
                filter.active ? "bg-main" : "bg-pearl ",
                "w-32 py-1 rounded-md flex justify-center cursor-pointer hover:bg-main transition duration-200 ease-in"
              )}
            >
              <p className="text-base text-neutral-900 font-medium">
                {filter.name}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 py-6 justify-center">
          {ProductData.map((product: any) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              brand={product.brand}
              category={product.category}
              image={product.imageUrl}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
