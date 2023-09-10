import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  return (
    <section className=" h-screen">
      <Navbar />
      <div className=" pt-20 md:w-full  h-full flex">
        <Sidebar />
        <div className="md:w-full md:ml-[220px]">{children}</div>
      </div>
    </section>
  );
};

export default StoreLayout;
