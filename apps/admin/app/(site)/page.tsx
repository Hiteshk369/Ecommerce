import CardContainer from "../../components/CardContainer";
import React from "react";

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
    </div>
  );
};

export default Home;
