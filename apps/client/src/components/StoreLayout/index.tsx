import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Toaster } from "react-hot-toast";

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
      <Toaster />
    </section>
  );
};

export default StoreLayout;
