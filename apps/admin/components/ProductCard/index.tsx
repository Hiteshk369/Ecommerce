import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductProps {
  id: string;
  name: string;
  category: string;
  image: string;
  brand: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  category,
  image,
  brand,
  price,
}) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => console.log(id)}
      className="w-[30%] border-neutral-700 cursor-pointer"
    >
      <CardHeader className="w-full">
        <CardTitle className="text-xl w-full flex">
          <p> {name} </p>
          <p className="ml-auto text-base text-main">{brand}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-36 relative">
          <Image layout="fill" objectFit="contain" src={image} alt={name} />
        </div>
      </CardContent>
      <CardFooter className="flex gap-1">
        <IndianRupee size={18} />
        <p className="text-xl tracking-wide">{price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
