import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { Menu, Search, ShoppingCart, X } from "lucide-react";

import { REMOVE_USER } from "../../redux/reducers/userSlice";
import axiosInstance from "../../libs/axios";
import { IProduct } from "../../utils/types";

const Navbar = () => {
  const user = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [searchProducts, setSearchProducts] = useState([]);

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
      name: "Orders",
      path: "/orders",
      active: pathName.includes("/orders"),
    },
  ];

  const fetchCartItems = async () => {
    const response = await axiosInstance.get("/cart/viewcart");
    return response.data;
  };

  const { data } = useQuery("cartItems", fetchCartItems);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.post("/product/searchproduct", {
        name: searchText,
      });
      setSearchProducts(response.data.product);
    };
    const delay = 800;
    const debounce = setTimeout(() => {
      fetchData();
    }, delay);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchText]);

  const handleNavigate = (product: IProduct) => {
    navigate(`/store/${product.category}/${product._id}`);
    navigate(0);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      dispatch(REMOVE_USER());
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="md:w-screen w-full bg-white fixed z-[100000000]">
      <div className="md:max-w-[1240px] max-w-[94%] md:h-20 h-16 flex items-center justify-between m-auto">
        <Link to="/">
          <p className="md:text-[1.4rem] text-[1.2rem] tracking-[0.4px] text-[#1e1e20] font-semibold">
            <span className="text-darkBlue">e</span>COMMERCE
          </p>
        </Link>
        <div className="md:flex hidden items-center gap-4">
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
          {pathName !== "/" && (
            <div className="md:flex hidden items-center gap-4">
              <div className="flex relative">
                <input
                  className="bg-lightGray p-2 rounded-lg w-[350px] outline-none pl-6 text-neutral-800"
                  type="text"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Search className="absolute text-neutral-600 right-2 top-2" />
                <div
                  className={`${
                    searchText
                      ? "flex flex-col absolute w-[350px] h-auto bg-gray-200 top-11 rounded-md p-2 gap-2"
                      : "hidden"
                  }  `}
                >
                  {searchProducts.length > 0 && searchProducts.length > 3
                    ? searchProducts.slice(0, 3).map((product: IProduct) => (
                        <div
                          key={product._id}
                          className="flex w-full gap-3 bg-slate-100"
                        >
                          <img
                            className="w-20 h-20"
                            src={product.imageUrl}
                            alt={product.name}
                          />
                        </div>
                      ))
                    : searchProducts.map((product: IProduct) => (
                        <div
                          key={product._id}
                          onClick={() => handleNavigate(product)}
                          className="flex w-full gap-3 bg-white cursor-pointer rounded-md px-5 py-2 items-center"
                        >
                          <img
                            className="w-16"
                            src={product.imageUrl}
                            alt={product.name}
                          />
                          <p className="text-base text-neutral-700">
                            {product.name}
                          </p>
                        </div>
                      ))}
                </div>
              </div>
              <Link to="/cart" className="flex items-center relative">
                <ShoppingCart size={25} color="#1e1e20" />
                {data && data.cartItems.length > 0 && (
                  <div className="w-4 h-4 text-[#d0d0d1] absolute flex items-center justify-center text-[0.8rem] font-medium top-[-20%] right-[-20%] p-2 rounded-[50%] bg-darkBlue">
                    {data.cartItems.length}
                  </div>
                )}
              </Link>
            </div>
          )}
          <div className="w-20 md:flex md:pl-4 hidden items-center justify-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="text-base bg-darkBlue text-[#d0d0d1] font-medium cursor-pointer transition-[0.2s] duration-[ease-in-out] px-5 py-[0.4rem] rounded-lg border-[none] hover:bg-[#2763ff] hover:text-[#ebebef]"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="text-base bg-darkBlue text-[#d0d0d1] font-medium cursor-pointer transition-[0.2s] duration-[ease-in-out] px-5 py-[0.4rem] rounded-lg border-[none] hover:bg-[#2763ff] hover:text-[#ebebef]">
                  Login
                </button>
              </Link>
            )}
          </div>
          <div className="md:hidden relative flex gap-4">
            {pathName !== "/" && (
              <Link to="/cart" className="md:hidden flex items-center relative">
                <ShoppingCart size={25} color="#1e1e20" />
                {data && data.cartItems.length > 0 && (
                  <div className="w-4 h-4 text-[#d0d0d1] absolute flex items-center justify-center text-[0.8rem] font-medium top-[-20%] right-[-20%] p-2 rounded-[50%] bg-darkBlue">
                    {data.cartItems.length}
                  </div>
                )}
              </Link>
            )}
            <button onClick={() => setToggleMenu(!toggleMenu)}>
              {toggleMenu ? <X /> : <Menu />}
            </button>
            {toggleMenu && (
              <div className="absolute right-0 top-6 z-10 bg-slate-100 px-10 py-4 rounded-lg">
                <div className="flex flex-col items-center gap-5">
                  {categories.map((category) => (
                    <Link to={category.path} key={category.id}>
                      <p className="text-neutral-900 font-medium">
                        {category.name}
                      </p>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-center pt-4 w-full">
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="px-5 py-1 text-base bg-darkBlue text-white font-medium cursor-pointer  rounded-lg "
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login">
                      <button className="px-5 py-1 text-base bg-darkBlue text-white font-medium cursor-pointer  rounded-lg">
                        Login
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
