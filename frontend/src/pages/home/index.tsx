import Navbar from "../../components/Navbar";
import classes from "./home.module.css";
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
    <main className={classes.container}>
      <Navbar />
      <div className={classes.screenContainer}>
        <div className={classes.gridContainer}>
          <div className={classes.bannerContainer}>
            <img
              className={classes.mainBanner}
              src={MainBanner}
              alt="MainBanner"
            />
            <button className={classes.hoverShopButton}>Shop now</button>
          </div>
          <div className={classes.fourBannerContainer}>
            {banners.map((banner) => (
              <div key={banner.id} className={classes.smallBannerContainer}>
                <img
                  className={classes.smallBanner}
                  src={banner.image}
                  alt={banner.alt}
                />
                <p className={classes.smallBannerHeading}>{banner.heading}</p>
                <p className={classes.smallBannerTitle}>{banner.title}</p>
                <p className={classes.smallBannerDescription}>
                  {banner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.brandContainer}>
          <p className={classes.brandTitle}>
            Brands<span>.</span>
          </p>
          <div className={classes.brandItemContainer}>
            {brands.map((brand) => (
              <img
                width={120}
                height={120}
                key={brand.id}
                src={brand.image}
                alt={brand.alt}
              />
            ))}
          </div>
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.leftPart}>
            <p className={classes.leftPartText}>
              We provide best customer experiences
            </p>
          </div>
          <div className={classes.rightPart}>
            <div className={classes.line} />
            <p className={classes.rightPartText}>
              We ensure our customers have the best shopping experience
            </p>
          </div>
        </div>
        <div className={classes.featureContainer}>
          {features.map((feature) => (
            <div key={feature.id}>
              <div className={classes.iconContainer}>{feature.Icon}</div>
              <p className={classes.featureTitle}>{feature.title}</p>
              <p className={classes.featureDescription}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
