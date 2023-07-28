import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { banners } from "../../utils/Banner";
import { brands } from "../../utils/Banner";
import MainBanner from "../../assets/Banners/MainBanner.jpeg";

import { BadgeDollarSign, BaggageClaim, Smile, Truck } from "lucide-react";

const Home = () => {
  const features = [
    {
      id: 1,
      Icon: <BadgeDollarSign />,
      title: "Original Products",
      description:
        "We provide money back guarantee if the product is not original",
    },
    {
      id: 2,
      Icon: <Smile />,
      title: "Satisfaction Guarantee",
      description:
        "Exchange the product you've purchases if you're not satisfied",
    },
    {
      id: 3,
      Icon: <BaggageClaim />,
      title: "New Product Everyday",
      description: "We update our collections almost everyday",
    },
    {
      id: 4,
      Icon: <Truck />,
      title: "Fast Shipping",
      description: "We offer fast shipping for our customers",
    },
  ];
  return (
    <main className="w-screen h-full bg-white">
      <Navbar />
      <div className="max-w-[1240px] m-auto pt-28">
        <div className="grid grid-cols-2 h-[30rem] gap-4">
          <div className="relative overflow-hidden rounded-lg border-[#d0d0d1]">
            <img
              className="bg-contain h-full w-full cursor-pointer"
              src={MainBanner}
              alt="MainBanner"
            />
            <button className="absolute bg-[#66b8e8] font-semibold opacity-70 transition-[0.3s] duration-[ease-in-out] cursor-pointer px-6 py-3 rounded-lg border-[none] left-[40%] bottom-[45%] scale-[0.9]">
              Shop now
            </button>
          </div>
          <div className="relative overflow-hidden grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-x-4 gap-y-4">
            {banners.map((banner) => (
              <div key={banner.id} className="relative rounded-lg">
                <img
                  className=" bg-contain h-full w-full cursor-pointer rounded-lg"
                  src={banner.image}
                  alt={banner.alt}
                />
                <p className="absolute text-[0.85rem] font-medium text-[#fc9d43] left-[8%] top-[15%]">
                  {banner.heading}
                </p>
                <p className="absolute text-xl font-medium left-[8%] top-[35%]">
                  {banner.title}
                </p>
                <p className="absolute w-40 text-xs font-normal left-[8%] bottom-[30%]">
                  {banner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-16">
          <p className="text-[2rem] text-[#161616] capitalize font-semibold">
            Brands<span className="text-5xl text-darkBlue">.</span>
          </p>
          <div className="flex justify-evenly">
            {brands.map((brand) => (
              <img
                className="mix-blend-multiply"
                width={120}
                height={120}
                key={brand.id}
                src={brand.image}
                alt={brand.alt}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full my-10">
          <div className="w-[30%]">
            <p className="text-[1.75rem] font-semibold">
              We provide best customer experiences
            </p>
          </div>
          <div className="flex flex-1 items-center">
            <div className="w-2/5 h-4/5 border-r-[2.5px] border-r-[#161616] border-solid" />
            <p className="text-[#bfc4c8] ml-auto">
              We ensure our customers have the best shopping experience
            </p>
          </div>
        </div>
        <div className="h-40 grid grid-cols-4 gap-x-16 mb-8">
          {features.map((feature) => (
            <div key={feature.id}>
              <div className="h-11 w-11 overflow-hidden bg-[#dcdde0] flex items-center justify-center mb-4 rounded-lg">
                {feature.Icon}
              </div>
              <p className="font-semibold mb-2">{feature.title}</p>
              <p className="text-[#bfc4c8] text-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
