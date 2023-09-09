import { BadgeDollarSign, BaggageClaim, Smile, Truck } from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { brands } from "../../utils/Banner";
import { Link } from "react-router-dom";

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
    <main className="md:w-screen w-full h-full bg-white">
      <Navbar />
      <div className="md:max-w-[1240px] max-w-[94%] m-auto pt-28">
        <div className="md:h-[30rem] h-[18rem] gap-4">
          {/* <div className="relative overflow-hidden rounded-lg border-[#d0d0d1] group">
            <img
              className="bg-contain h-full w-full cursor-pointer"
              src={MainBanner}
              alt="MainBanner"
            />
            <button className="absolute bg-[#66b8e8] font-semibold opacity-70 transition-[0.3s] duration-[ease-in-out] cursor-pointer px-6 py-3 rounded-lg border-[none] left-[40%] bottom-[45%] scale-[0.9] group-hover:scale-[1] group-hover:opacity-100">
              Shop now
            </button>
          </div> */}
          <div className="w-full h-full flex flex-col items-center space-y-3 justify-center bg-emerald-300 rounded-md">
            <p className="md:text-3xl text-xl font-medium">
              Welcome to Ecommerce store
            </p>
            <p className="text-neutral-600 font-medium md:text-base text-sm">
              Shop your favorite items from different brands
            </p>
            <Link to="/store">
              <button className="px-8 py-2 rounded-md border-2 font-medium border-slate-100 hover:bg-slate-100 hover:text-emerald-900 transition ease-in-out">
                Store
              </button>
            </Link>
          </div>
          {/* <div className="relative overflow-hidden grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-x-4 gap-y-4">
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
          </div> */}
        </div>
        <div className="md:pt-16 pt-8">
          <p className="md:text-[2rem] text-[1.75rem] text-[#161616] capitalize font-semibold">
            Brands<span className="text-5xl text-darkBlue">.</span>
          </p>
          <div className="flex justify-evenly flex-wrap">
            {brands.map((brand) => (
              <img
                className="mix-blend-multiply md:w-[120px] md:h-[120px] w-[100px] h-[100px]"
                key={brand.id}
                src={brand.image}
                alt={brand.alt}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full my-10 ">
          <div className="md:w-[30%] w-[25%]">
            <p className="md:text-[1.75rem] text-[0.75rem] font-semibold">
              We provide best customer experiences
            </p>
          </div>
          <div className="flex flex-1 items-center">
            <div className="w-2/5 h-4/5 md:border-r-[2.5px] border-r-[2px] border-r-[#161616] border-solid" />
            <p className="text-[#9c9c9c]  ml-2 md:text-xl text-xs">
              We ensure our customers have the best shopping experience
            </p>
          </div>
        </div>
        <div className="h-40 grid md:grid-cols-4 grid-cols-2 md:gap-x-16 gap-x-8 md:gap-y-0 gap-y-6 md:mb-8 mb-44">
          {features.map((feature) => (
            <div key={feature.id}>
              <div className="md:h-11 md:w-11 h-8 w-8 overflow-hidden bg-[#dcdde0] flex items-center justify-center mb-4 rounded-lg">
                {feature.Icon}
              </div>
              <p className="font-semibold mb-2">{feature.title}</p>
              <p className="text-[#9c9c9c] text-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
