import OverviewChart from "../../components/OverviewChart";
import CardContainer from "../../components/CardContainer";
import { IndianRupee, Plus, User } from "lucide-react";

const Home = () => {
  return (
    <div className="w-full h-full px-14 py-8">
      <div className="flex flex-col gap-1 mb-5">
        <p className="text-3xl font-semibold text-pearl">
          Welcome Back, Hitesh Kumar
        </p>
        <p className="text-lg text-subGray">
          Here&apos;s what&apos;s happening with your store.
        </p>
      </div>
      <div className="w-full h-[25%]">
        <CardContainer />
      </div>
      <div className="h-[60%] w-full mt-5 flex gap-4">
        <div className="w-[60%] h-full flex items-center justify-center border border-neutral-600 rounded-lg p-4">
          <OverviewChart />
        </div>
        <div className="w-[40%] h-full border border-neutral-600 rounded-lg p-4">
          <p className="text-lg text-pearl font-medium">Recent sales</p>
          <div className="flex flex-col gap-4 pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center">
                  <User size={25} className="text-black" />
                </div>
                <div className="flex flex-col text-pearl">
                  <p className="font-medium">Hitesh</p>
                  <p className="font-normal text-subGray">hitesh@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Plus size={18} className="text-pearl" />
                <IndianRupee size={20} className="text-pearl ml-1" />
                <p className="text-xl text-pearl">76000</p>
              </div>
            </div>
            {/* another */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pearl flex items-center justify-center">
                  <User size={25} className="text-black" />
                </div>
                <div className="flex flex-col text-pearl">
                  <p className="font-medium">Hitesh</p>
                  <p className="font-normal text-subGray">hitesh@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Plus size={18} className="text-pearl" />
                <IndianRupee size={20} className="text-pearl ml-1" />
                <p className="text-xl text-pearl">76000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
