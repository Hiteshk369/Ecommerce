import { Link } from "react-router-dom";
import { Instagram, Github, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  const shopList = [
    {
      id: 1,
      name: "All Products",
      path: "/store",
    },
    {
      id: 2,
      name: "Mobiles",
      path: "/store/category?type=mobile",
    },
    {
      id: 3,
      name: "Laptops",
      path: "/store/category?type=laptop",
    },
    {
      id: 4,
      name: "Watches",
      path: "/store/category?type=watch",
    },
    {
      id: 5,
      name: "Headphones",
      path: "/store/category?type=headphone",
    },
  ];

  const companyList = [
    {
      id: 1,
      name: "About Us",
      path: "/about",
    },
    {
      id: 2,
      name: "Careers",
      path: "",
    },
  ];

  const connectIcons = [
    {
      id: 1,
      Icon: Mail,
      style: "text-darkGray transition hover:text-[#34a853]",
      path: "mailto:pvkhk369@gmail.com",
    },
    {
      id: 2,
      Icon: Linkedin,
      style: "text-darkGray transition hover:text-[#0a66c2]",
      path: "https://www.linkedin.com/in/hiteshkumar369/",
    },
    {
      id: 3,
      Icon: Github,
      style: "text-darkGray transition hover:text-[#111]",
      path: "https://github.com/Hiteshk369",
    },
    {
      id: 4,
      Icon: Instagram,
      style: "text-darkGray transition hover:text-[#e4405f]",
      path: "https://www.instagram.com/hitesh_kumar369/",
    },
  ];
  return (
    <div className="h-full bg-[#ebeef2] md:w-screen w-full">
      <div className="md:max-w-[1240px] max-w-[94%] m-auto md:pt-12 pt-8 flex flex-wrap pb-8 border-b border-b-[#e4dcdc]">
        <div className="md:w-[35%]">
          <p className="md:text-2xl text-lg font-semibold md:pb-3 pb-2">
            <span className="text-darkBlue">e</span>COMMERCE
          </p>
          <p className=" md:text-sm text-[0.7rem] text-[#9c9c9c]">
            Robust, user-friendly ecommerce platform designed to facilitate
            smooth and secure online transactions, while empowering businesses
            to reach a global audience effortlessly.
          </p>
        </div>
        <div className="md:w-[35%] flex md:gap-16 gap-12 md:ml-16 md:pt-0 pt-4">
          <div className="md:w-[30%] w-[28%]">
            <p className="md:text-[1.15rem] text-[0.9rem] font-medium mb-[0.7rem]">
              SHOP
            </p>
            <div className="flex flex-col gap-[0.15rem]">
              {shopList.map((item) => (
                <Link
                  className="no-underline text-[#9c9c9c] md:text-[0.9rem] text-[0.7rem] transition-[0.2s] duration-[ease-in-out] hover:text-darkBlue hover:font-semibold"
                  to={item.path}
                  key={item.id}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[30%]">
            <p className="md:text-[1.15rem] text-[0.9rem] font-medium mb-[0.7rem]">
              COMPANY
            </p>
            <div className="flex flex-col gap-[0.15rem]">
              {companyList.map((item) => (
                <Link
                  className="no-underline text-[#9c9c9c] md:text-[0.9rem] text-[0.7rem] transition-[0.2s] duration-[ease-in-out] hover:text-darkBlue hover:font-semibold"
                  to={item.path}
                  key={item.id}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[30%]">
            <p className="md:text-[1.15rem] text-[0.9rem] font-medium mb-[0.7rem]">
              ADDRESS
            </p>
            <div>
              <p className="text-[#9c9c9c] md:text-[0.9rem] text-[0.7rem]">
                Padmakshi colony, Hanamkonda, Warangal, Telangana, India -
                506001
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-[30%] md:ml-auto ml-auto mr-auto md:pt-0 pt-4">
          <div className="md:max-w-[60%] md:ml-auto ">
            <p className="md:text-[1.15rem] text-[0.9rem] font-medium mb-[0.7rem]">
              Connect with us
            </p>
            <div className="flex md:gap-[1.2rem] gap-[0.75rem]">
              {connectIcons.map((icon) => (
                <Link to={icon.path} target="_blank" key={icon.id}>
                  <icon.Icon className={icon.style} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-16 flex justify-center items-center">
        <p className="text-[#9c9c9c] md:text-base text-xs">
          Copyright {"\u00a9"} 2023 eCOMMERCE. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
