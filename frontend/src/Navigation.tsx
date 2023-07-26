import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/registration/SignUp";
import Home from "./pages/home";
import Error404 from "./pages/error";
import Login from "./pages/registration/login";
import Root from "./libs/Root";
import Store from "./pages/store";
import Product from "./pages/Product";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error404 />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "store",
          element: <Store />,
        },
        {
          path: "store/:category/:id",
          element: <Product />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default Routes;
