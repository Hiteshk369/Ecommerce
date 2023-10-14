import React from "react";
import Sidebar from "../../components/Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="w-full h-full">
      <Sidebar>{children}</Sidebar>
    </main>
  );
};

export default MainLayout;
