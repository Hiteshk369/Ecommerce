import { Link } from "react-router-dom";
import { IndianRupee } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  image,
  price,
  category,
}) => {
  return (
    <Link
      to={`/store/${category}/${id}`}
      className={`md:w-[260px] md:h-[320px] w-[165px] h-[260px] border border-lightGray shadow-md rounded-md  relative  group cursor-pointer transition-[2]  hover:scale-[1.02] `}
    >
      <div className="w-full md:h-[120px] h-[100px] bg-sky-200">
        <div className="w-full h-[200px] flex items-center justify-center">
          <img
            className=" md:w-[160px] sm:w-[140px] w-[120px]"
            src={image}
            alt={name}
          />
        </div>
        <p className="absolute top-0 px-4 py-4 font-medium md:text-lg text-sm text-white">
          {brand}
        </p>
      </div>
      <div className="pt-16 px-4 flex">
        <div>
          <p className="text-neutral-800 md:text-2xl sm:text-base text-[0.8rem] font-medium">
            {name}
          </p>
          <p className="sm:text-xs text-[0.75rem] capitalize font-medium text-darkGray">
            {category}
          </p>
        </div>
      </div>
      <div className="md:h-10 h-8 md:w-[60%] w-[50%] bg-sky-500 absolute bottom-5 md:right-[-5px] right-0 rounded-md flex items-center justify-center">
        <IndianRupee size={15} />
        <p className="md:text-base text-sm">{price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
