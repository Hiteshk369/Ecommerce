import { Heart, Search, ShoppingCart, UserCircle2 } from "lucide-react";
import classes from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [login, setLogin] = useState(true);
  const [cartItems, setCartItems] = useState(0);
  const pathName = window.location.pathname;
  console.log(pathName);
  const categories = [
    {
      id: 1,
      name: "Home",
      path: "/",
      active: pathName === "/",
    },
    {
      id: 2,
      name: "Store",
      path: "/store",
      active: pathName.includes("/store"),
    },
    {
      id: 3,
      name: "Brands",
      path: "/products/brands",
      active: pathName === "/brands",
    },
  ];
  return (
    <div className={classes.Container}>
      <div className={classes.navContainer}>
        <div className={classes.logo}>
          <p>
            <span>e</span>COMMERCE
          </p>
        </div>
        <div className={classes.flexContainer}>
          {categories.map((category) => (
            <Link
              className={
                category.active ? classes.active : classes.categoryItem
              }
              to={category.path}
              key={category.id}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className={classes.flexContainer}>
          <div className="flex relative">
            <input
              className="bg-lightGray p-2 rounded-lg w-[300px] outline-none pl-6 text-neutral-800"
              type="text"
            />
            <Search className="absolute text-neutral-600 right-2 top-2" />
          </div>
          <Heart size={25} color="#1e1e20" />
          <div className={classes.cartContainer}>
            <ShoppingCart size={25} color="#1e1e20" />
            {cartItems > 0 && (
              <div className={classes.cartItem}>{cartItems}</div>
            )}
          </div>
          <div className={classes.buttonContainer}>
            {login ? (
              <UserCircle2 size={25} color="#1e1e20" />
            ) : (
              <button className={classes.loginButton}>Login</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
