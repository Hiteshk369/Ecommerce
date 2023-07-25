import { Toaster } from "react-hot-toast";

import bg from "../../assets/ecommercebg.jpg";
import Logo from "../../assets/Logo.png";

import classes from "./registerLayout.module.css";

interface RegisterLayoutProps {
  children: React.ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
  return (
    <section className={classes.sectionContainer}>
      <img className={classes.bgImage} src={bg} alt="background" />
      <div className={classes.gradientStyle} />
      <div className={classes.pageContainer}>
        <div className={classes.header}>
          <div className={classes.circle} />
          <p className={classes.title}>
            <span>e</span>COMMERCE
          </p>
        </div>
        <div className={classes.gridContainer}>{children}</div>
      </div>
      <Toaster />
      <img width="125" className={classes.logo} src={Logo} alt="logo" />
    </section>
  );
};

export default RegisterLayout;
