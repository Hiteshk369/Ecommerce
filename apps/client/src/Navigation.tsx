import { Routes, Route } from "react-router-dom";

import {
  Cancel,
  Cart,
  Error404,
  Home,
  Login,
  Orders,
  Product,
  ProductCategory,
  SignUp,
  Store,
} from "./pages";
import ProtectedRoute from "./libs/ProtectedRoute";
import Success from "./pages/success";
import { useAppSelector } from "./libs/hooks";

const AppRoutes = () => {
  const user = useAppSelector((state) => state.user.id);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/store"
        element={
          <ProtectedRoute user={user}>
            <Store />
          </ProtectedRoute>
        }
      />
      <Route path="/store/category" element={<ProductCategory />} />
      <Route path="/store/:category/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/success"
        element={
          <ProtectedRoute user={user}>
            <Success />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cancel"
        element={
          <ProtectedRoute user={user}>
            <Cancel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute user={user}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRoutes;
