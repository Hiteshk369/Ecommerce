import bg from "../../assets/ecommercebg.jpg";
import Logo from "../../assets/Logo.png";

interface RegisterLayoutProps {
  children: React.ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
  return (
    <section className="md:w-screen w-full h-screen bg-[color:var(--bg)] relative">
      <img
        className="md:flex hidden absolute h-screen w-screen overflow-x-hidden left-[20%] top-0"
        src={bg}
        alt="background"
      />
      <div className="gradientBg absolute h-screen md:w-screen w-full md:left-[20%] left-0 top-0" />
      <div className="md:max-w-[1240px] max-w-[90%] relative m-auto pt-[3%]">
        <div className="w-full flex items-center">
          <div className="h-4 w-4 bg-darkBlue mr-2 rounded-[50%]" />
          <p className="text-white font-medium text-xl tracking-[0.75px]">
            <span className="text-darkBlue">e</span>COMMERCE
          </p>
        </div>
        <div className="md:grid md:grid-cols-2 gap-x-[2%] h-full mt-[6%]">
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
