import { IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

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
      className={`w-[260px] h-[320px] border border-lightGray shadow-md rounded-md  relative  group cursor-pointer transition-[2]  hover:scale-[1.02] `}
    >
      <div className="w-full h-[120px] bg-sky-200">
        <div className="w-full h-[200px] flex items-center justify-center">
          <img width={160} height={160} src={image} alt={name} />
        </div>
        <p className="absolute top-0 px-4 py-4 font-medium text-lg text-white">
          {brand}
        </p>
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
