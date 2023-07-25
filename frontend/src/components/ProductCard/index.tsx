import { Heart, Star, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
  wishlist: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  image,
  price,
  category,
  wishlist,
}) => {
  return (
    <Link
      to={`/store/product/${id}`}
      className={`w-[260px] h-[320px] border border-lightGray shadow-md rounded-md  relative  group cursor-pointer transition-[2]  hover:scale-[1.02] `}
    >
      <div className="w-full h-[120px] bg-sky-200">
        <div className="absolute z-[100] top-[5%] left-[15%] w-[120] h-[120]  transition ">
          <img width={180} height={180} src={image} alt={name} />
        </div>
        <Heart
          className={
            wishlist
              ? "absolute top-[2%] right-[3%] text-[#ff5555]"
              : "absolute top-[2%] right-[3%] text-neutral-500"
          }
          fill={wishlist ? "#ff5555" : "rgb(186,230,253)"}
        />
        <p className="px-4 py-4 font-medium text-lg text-white">{brand}</p>
      </div>
      <div className="pt-16 px-4 flex">
        <div>
          <p className="text-neutral-800 text-2xl font-medium">{name}</p>
          <p className="text-sm font-medium text-darkGray">{category}</p>
        </div>
      </div>
      <div className="h-10 w-[60%] bg-sky-500 absolute bottom-5 right-[-5px] rounded-md flex items-center justify-center">
        <IndianRupee size={15} />
        <p>{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
