import { Routes, Route } from "react-router-dom";

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
import ProtectedRoute from "./libs/ProtectedRoute";

const AppRoutes = () => {
  const user = localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/store" element={<Store />} />
      <Route path="/store/category" element={<ProductCategory />} />
      <Route path="/store/:category/:id" element={<Product />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute user={user}>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
