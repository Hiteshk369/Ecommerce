import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/registration/SignUp";
import Home from "./pages/home";
import Error404 from "./pages/error";
import Login from "./pages/registration/login";
import Root from "./libs/Root";
import Store from "./pages/store";
import Product from "./pages/Product";
import ProductCategory from "./pages/ProductCategory";
import Cart from "./pages/cart";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error404 />,
    },
    {
      path: "/register",
      element: <SignUp />,
      errorElement: <Error404 />,
    },
    {
      path: "/",
      element: <Home />,
      errorElement: <Error404 />,
    },
    {
      path: "/",
      element: <Root />,
      errorElement: <Error404 />,
      children: [
        {
          path: "store",
          element: <Store />,
        },
        {
          path: "/store/:category/:id",
          element: <Product />,
        },
        {
          path: "/store/category",
          element: <ProductCategory />,
        },
      ],
    },
    {
      path: "cart",
      element: <Cart />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routes;
