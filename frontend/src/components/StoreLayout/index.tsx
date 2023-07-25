import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Search, SlidersHorizontal } from "lucide-react";

interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  return (
    <section className=" h-screen">
      <Navbar />
      <div className=" pt-20 w-full h-full flex">
        <Sidebar />
        <div className="w-full ml-[220px]">{children}</div>
      </div>
    </section>
  );
};

export default StoreLayout;
