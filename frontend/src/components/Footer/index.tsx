import { Link } from "react-router-dom";
import classes from "./footer.module.css";
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
      style: classes.gmailIcon,
      path: "mailto:pvkhk369@gmail.com",
    },
    {
      id: 2,
      Icon: Linkedin,
      style: classes.linkedinIcon,
      path: "https://www.linkedin.com/in/hiteshkumar369/",
    },
    {
      id: 3,
      Icon: Github,
      style: classes.githubIcon,
      path: "https://github.com/Hiteshk369",
    },
    {
      id: 4,
      Icon: Instagram,
      style: classes.instagramIcon,
      path: "https://www.instagram.com/hitesh_kumar369/",
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.mainContainer}>
        <div className={classes.aboutContainer}>
          <p className={classes.logo}>
            <span>e</span>COMMERCE
          </p>
          <p className={classes.description}>
            Robust, user-friendly ecommerce platform designed to facilitate
            smooth and secure online transactions, while empowering businesses
            to reach a global audience effortlessly.
          </p>
        </div>
        <div className={classes.middleContainer}>
          <div className={classes.shopContainer}>
            <p className={classes.subTitle}>SHOP</p>
            <div className={classes.shopList}>
              {shopList.map((item) => (
                <Link
                  className={classes.shopListItem}
                  to={item.path}
                  key={item.id}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className={classes.shopContainer}>
            <p className={classes.subTitle}>COMPANY</p>
            <div className={classes.shopList}>
              {companyList.map((item) => (
                <Link
                  className={classes.shopListItem}
                  to={item.path}
                  key={item.id}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className={classes.shopContainer}>
            <p className={classes.subTitle}>ADDRESS</p>
            <div>
              <p className={classes.addressItem}>
                Padmakshi colony, Hanamkonda, Warangal, Telangana, India -
                506001
              </p>
            </div>
          </div>
        </div>
        <div className={classes.connectContainer}>
          <div className={classes.widthContainer}>
            <p className={classes.subTitle}>Connect with us</p>
            <div className={classes.flexContainer}>
              {connectIcons.map((icon) => (
                <Link to={icon.path} target="_blank" key={icon.id}>
                  <icon.Icon className={icon.style} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={classes.copyrightContainer}>
        <p className={classes.copyrightText}>
          Copyright {"\u00a9"} 2023 eCOMMERCE. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
