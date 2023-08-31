"use client";
import React, { useMemo } from "react";
import Box from "../Box";
import {
  BarChart,
  ShoppingBag,
  User,
  Book,
  Settings,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathName = usePathname();

  const navLinks = useMemo(
    () => [
      {
        id: 1,
        name: "Overview",
        to: "/",
        Icon: BarChart,
        active: pathName === "/",
      },
      {
        id: 2,
        name: "Product",
        to: "/product",
        Icon: ShoppingBag,
        active: pathName === "/product",
      },
      {
        id: 3,
        name: "Orders",
        to: "/",
        Icon: Book,
        active: pathName === "/orders",
      },
      {
        id: 4,
        name: "Users",
        to: "/",
        Icon: User,
        active: pathName === "/users",
      },
    ],
    [pathName]
  );

  return (
    <div className="flex h-full">
      <div className="w-[300px] h-full flex flex-col gap-y-2 p-4 border-r border-neutral-700">
        <Box className="py-5 px-2">
          <p className="text-white font-bold text-2xl">
            <span className="text-main">E</span>commerce
          </p>
        </Box>
        <Box className="h-[calc(100%-40%)] flex flex-col justify-center">
          <div className="flex flex-col py-10 space-y-6 px-2">
            {navLinks.map((link) => (
              <Link
                className={
                  link.active
                    ? "w-full bg-darkBlue text-main p-2 rounded-3xl flex items-center  space-x-3"
                    : "w-full  p-2 rounded-3xl flex items-center space-x-3 transition ease-in-out text-white hover:bg-main hover:text-neutral-800"
                }
                key={link.id}
                href={link.to}
              >
                <link.Icon className="pl-1" />
                <p className="text-base font-lg font-medium">{link.name}</p>
              </Link>
            ))}
          </div>
        </Box>
        <div className="py-10 space-y-6">
          <div className="flex items-center gap-3 px-3 cursor-pointer">
            <Settings className="text-main" size={20} />
            <p className="text-main font-medium">Settings</p>
          </div>
          <div className="flex items-center gap-3 px-3 cursor-pointer">
            <LogOut className="text-main" size={20} />
            <p className="text-main font-medium">Logout</p>
          </div>
        </div>
      </div>
      <main className="w-full h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
