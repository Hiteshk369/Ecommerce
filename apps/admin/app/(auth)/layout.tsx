import Image from "next/image";
import React from "react";
import Logo from "../../public/LogoDark.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="w-full h-full relative">
      <p className="text-pearl absolute top-8 left-8 font-semibold text-2xl tracking-tight">
        <span className="text-main">E</span>commerce
      </p>
      <Image
        className="absolute bottom-8 right-8"
        src={Logo}
        alt="logo"
        width={125}
        height={125}
      />
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
