import { Heart, Search, ShoppingCart, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { getFetcher } from "../../libs/fetcher";

const Navbar = () => {
  const [login, setLogin] = useState(true);
  const pathName = window.location.pathname;

  const categories = [
    {
      id: 1,
      name: "Home",
      path: "/",
      active: pathName === "/",
    },
    {
      id: 2,
      name: "Store",
      path: "/store",
      active: pathName.includes("/store"),
    },
    {
      id: 3,
      name: "Brands",
      path: "/products/brands",
      active: pathName === "/brands",
    },
  ];

  const fetchCartItems = async () => {
    const response = await getFetcher(
      "http://localhost:5000/api/cart/viewcart"
    );
    return response;
  };

  const { data } = useQuery("cartItems", fetchCartItems);

  return (
    <div className="w-screen bg-white fixed z-[100000000]">
      <div className="max-w-[1240px] h-20 flex items-center justify-between m-auto">
        <div>
          <p className="text-[1.4rem] tracking-[0.4px] text-[#1e1e20] font-semibold">
            <span className="text-darkBlue">e</span>COMMERCE
          </p>
        </div>
        <div className="flex items-center gap-4">
          {categories.map((category) => (
            <Link
              className={
                category.active
                  ? 'text-[#1e1e20] font-semibold w-20 text-xl no-underline cursor-pointer ml-6 after:content-[""] after:block after:h-0.5 after:w-4/5 after:bg-darkBlue after:scale-x-100'
                  : 'w-20 text-xl text-[#1e1e20] cursor-pointer font-normal tracking-[0.5px] transition-[0.2s] duration-[ease-in] no-underline ml-6 hover:text-[#1e1e20] hover:font-semibold after:content-[""] after:block after:h-0.5 after:w-4/5 after:bg-darkBlue after:transition-[0.3s] after:duration-[ease-in-out] after:origin-left after:scale-x-0 hover:after:scale-x-100'
              }
              to={category.path}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex relative">
            <input
              className="bg-lightGray p-2 rounded-lg w-[300px] outline-none pl-6 text-neutral-800"
              type="text"
            />
            <Search className="absolute text-neutral-600 right-2 top-2" />
          </div>
          <Heart size={25} color="#1e1e20" />
          <Link to="/cart" className="flex items-center relative">
            <ShoppingCart size={25} color="#1e1e20" />
            {data && data.cartItems.length > 0 && (
              <div className="w-4 h-4 text-[#d0d0d1] absolute flex items-center justify-center text-[0.8rem] font-medium top-[-20%] right-[-20%] p-2 rounded-[50%] bg-darkBlue">
                {data.cartItems.length}
              </div>
            )}
          </Link>
          <div className="w-24 flex items-center justify-center">
            {login ? (
              <UserCircle2 size={25} color="#1e1e20" />
            ) : (
              <button className="text-base bg-darkBlue text-[#d0d0d1] font-medium cursor-pointer transition-[0.2s] duration-[ease-in-out] px-5 py-[0.4rem] rounded-lg border-[none] hover:bg-[#2763ff] hover:text-[#ebebef]">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
