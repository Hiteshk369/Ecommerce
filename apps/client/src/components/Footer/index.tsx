import { Link } from "react-router-dom";
import { Instagram, Github, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  const shopList = [
    {
      id: 1,
      name: "All Products",
      path: "",
    },
    {
      id: 2,
      name: "Mobiles",
      path: "",
    },
    {
      id: 3,
      name: "Laptops",
      path: "",
    },
    {
      id: 4,
      name: "Watches",
      path: "",
    },
    {
      id: 5,
      name: "EarPods",
      path: "",
    },
  ];

  const companyList = [
    {
      id: 1,
      name: "About Us",
      path: "",
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
    <div className="h-80 bg-[#ebeef2] w-screen">
      <div className="max-w-[1240px] m-auto pt-12 flex pb-8 border-b border-b-[#e4dcdc]">
        <div className="w-[35%]">
          <p className="text-2xl font-semibold pb-3">
            <span className="text-darkBlue">e</span>COMMERCE
          </p>
          <p className=" text-sm text-[#9c9c9c]">
            Robust, user-friendly ecommerce platform designed to facilitate
            smooth and secure online transactions, while empowering businesses
            to reach a global audience effortlessly.
          </p>
        </div>
        <div className="w-[35%] flex gap-16 ml-16">
          <div className="w-[30%]">
            <p className="text-[1.15rem] font-medium mb-[0.7rem]">SHOP</p>
            <div className="flex flex-col gap-[0.15rem]">
              {shopList.map((item) => (
                <Link
                  className="no-underline text-[#9c9c9c] text-[0.9rem] transition-[0.2s] duration-[ease-in-out] hover:text-darkBlue hover:font-semibold"
                  to={item.path}
                  key={item.id}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[30%]">
            <p className="text-[1.15rem] font-medium mb-[0.7rem]">COMPANY</p>
            <div className="flex flex-col gap-[0.15rem]">
              {companyList.map((item) => (
                <Link
                  className="no-underline text-[#9c9c9c] text-[0.9rem] transition-[0.2s] duration-[ease-in-out] hover:text-darkBlue hover:font-semibold"
                  to={item.path}
                  key={item.id}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[30%]">
            <p className="text-[1.15rem] font-medium mb-[0.7rem]">ADDRESS</p>
            <div>
              <p className="text-[#9c9c9c] text-[0.9rem]">
                Padmakshi colony, Hanamkonda, Warangal, Telangana, India -
                506001
              </p>
            </div>
          </div>
        </div>
        <div className="w-[30%] ml-auto">
          <div className="max-w-[60%] ml-auto">
            <p className="text-[1.15rem] font-medium mb-[0.7rem]">
              Connect with us
            </p>
            <div className="flex gap-[1.2rem]">
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
        <p className="text-[#9c9c9c]">
          Copyright {"\u00a9"} 2023 eCOMMERCE. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
