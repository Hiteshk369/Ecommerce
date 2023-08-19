import { Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";

import {
  Cart,
  Error404,
  Home,
  Login,
  Product,
  ProductCategory,
  SignUp,
  Store,
} from "./pages";
import { useState } from "react";
import ProtectedRoute from "./libs/ProtectedRoute";

const AppRoutes = () => {
  const cookies = new Cookies();
  const token = cookies.get("Token");
  console.log(token);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    token === undefined ? false : true
  );
  // if (token === undefined) {
  //   setIsAuthenticated(false);
  // } else {
  //   setIsAuthenticated(true);
  // }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/category" element={<ProductCategory />} />
      <Route path="/store/:category/:id" element={<Product />} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
