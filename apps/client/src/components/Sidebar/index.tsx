import { useMemo } from "react";
import {
  LayoutGrid,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { useAppSelector } from "../../libs/hooks";
import { REMOVE_USER } from "../../redux/reducers/userSlice";
import axiosInstance from "../../libs/axios";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pathName = window.location.pathname;
  const [searchParams] = useSearchParams();

  const sidebarRoutes = useMemo(
    () => [
      {
        id: 1,
        name: "All Products",
        active: pathName === "/store",
        Icon: LayoutGrid,
        path: "/store",
      },
      {
        id: 2,
        name: "Mobiles",
        active:
          pathName.includes("/mobile") || searchParams.get("type") === "mobile",
        Icon: Smartphone,
        path: "/store/category?type=mobile",
      },
      {
        id: 3,
        name: "Laptops",
        active:
          pathName.includes("/laptop") || searchParams.get("type") === "laptop",
        Icon: Laptop,
        path: "/store/category?type=laptop",
      },
      {
        id: 4,
        name: "Watches",
        active:
          pathName.includes("/watch") || searchParams.get("type") === "watch",
        Icon: Watch,
        path: "/store/category?type=watch",
      },
      {
        id: 5,
        name: "HeadPhones",
        active:
          pathName.includes("/headphone") ||
          searchParams.get("type") === "headphone",
        Icon: Headphones,
        path: "/store/category?type=headphone",
      },
    ],
    [pathName, searchParams]
  );
  const fetchOrders = async () => {
    const response = await axiosInstance.get("/order");
    return response.data;
  };

  const { data } = useQuery("orderItems", fetchOrders);

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
    <div className="w-[225px] fixed left-0 h-full border-r border-r-lightGray px-4 pt-6 ">
      <div className="w-full px-3 flex flex-col items-center gap-1 border-b pb-2 border-b-lightGray">
        {sidebarRoutes.map((route) => (
          <Link
            className={
              route.active
                ? "w-full bg-darkBlue text-zinc-100 p-2 rounded-3xl flex items-center  space-x-3"
                : "w-full  p-2 rounded-3xl flex items-center space-x-3 transition ease-in-out hover:bg-darkBlue hover:text-zinc-100"
            }
            key={route.id}
            to={route.path}
          >
            <route.Icon className="pl-1" />
            <p className="text-sm">{route.name}</p>
          </Link>
        ))}
      </div>
      <div className="w-full px-3 pt-6 flex flex-col border-b pb-6 border-b-lightGray">
        <p className="text-sm font-medium text-darkGray">
          Last Orders:{" "}
          <span className="text-neutral-700 text-sm">
            {data ? data?.orders.length : 0}
          </span>
        </p>
        {data ? (
          <div className="pt-4 space-y-3">
            {data.orders.length !== 0 && (
              <div className="pl-1 flex items-center gap-1 w-90%">
                <ShoppingBag size={15} />
                <p className="text-neutral-700 text-sm">
                  {data?.orders[0].paymentInfo.id}
                </p>
              </div>
            )}
            {data.orders.length > 1 && (
              <div className="pl-1 flex items-center gap-1 pb-2">
                <ShoppingBag size={15} />
                <p className="text-neutral-700 text-sm">
                  {data?.orders[1].paymentInfo.id}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                user ? navigate("/orders") : toast.error("Login");
              }}
            >
              <p className="text-sm text-darkGray font-semiBold cursor-pointer transition ease-in-out hover:text-darkBlue">
                {data.orders.length !== 0 && "see all"}
              </p>
            </button>
          </div>
        ) : (
          <div>
            <p>No orders</p>
          </div>
        )}
      </div>
      <div className="w-full pt-24 px-3 flex flex-col ">
        <button onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="text-darkBlue" />
          <p>Log out</p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
