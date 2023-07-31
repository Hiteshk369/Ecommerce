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
import { Link, useSearchParams } from "react-router-dom";

const Sidebar = () => {
  let orders = 20;
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
        path: "/store?type=mobile",
      },
      {
        id: 3,
        name: "Laptops",
        active:
          pathName.includes("/laptop") || searchParams.get("type") === "laptop",
        Icon: Laptop,
        path: "/store?type=laptop",
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
          <span className="text-neutral-700 text-sm">{orders}</span>
        </p>
        <div className="pt-4 space-y-3">
          <div className="pl-1 flex items-center gap-1 w-90%">
            <ShoppingBag size={15} />
            <p className="text-neutral-700 text-sm">389237918280</p>
            <p className="text-darkGray text-xs font-semibold ml-auto cursor-pointer">
              view
            </p>
          </div>
          <div className="pl-1 flex items-center gap-1 pb-2">
            <ShoppingBag size={15} />
            <p className="text-neutral-700 text-sm">389237918280</p>
            <p className="text-darkGray text-xs font-semibold ml-auto cursor-pointer">
              view
            </p>
          </div>
          <p className="text-sm text-darkGray font-semiBold cursor-pointer transition ease-in-out hover:text-darkBlue">
            See all
          </p>
        </div>
      </div>
      <div className="w-full pt-24 px-3 flex flex-col ">
        <div className="flex items-center gap-2">
          <LogOut className="text-darkBlue" />
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
