import bg from "../../assets/ecommercebg.jpg";
import Logo from "../../assets/Logo.png";

interface RegisterLayoutProps {
  children: React.ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
  return (
    <section className="w-screen h-screen bg-[color:var(--bg)] relative">
      <img
        className="absolute h-screen w-screen overflow-x-hidden left-[20%] top-0"
        src={bg}
        alt="background"
      />
      <div className="gradientBg absolute h-screen w-screen left-[20%] top-0" />
      <div className="max-w-[1240px] relative m-auto pt-[3%]">
        <div className="w-full flex items-center">
          <div className="h-4 w-4 bg-darkBlue mr-2 rounded-[50%]" />
          <p className="text-white font-medium text-xl tracking-[0.75px]">
            <span className="text-darkBlue">e</span>COMMERCE
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-[2%] h-full mt-[6%]">
          {children}
        </div>
      </div>
      <img
        width="125"
        className="z-10 absolute right-[15px] bottom-[15px]"
        src={Logo}
        alt="logo"
      />
    </section>
  );
};

export default RegisterLayout;
