// CUSTOM IMPORTS
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import AppLayout from "./AppLayout";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import AdminRoutes from "./Routes/AdminRoutes";
import About from "./Pages/About";
import ProductDetails from "./Pages/PorductDetails";
import UserRoutes from "./Routes/UserRoutes";

// ROUTING
const ROUTER = createBrowserRouter([
  {
    // PARENT ROUTE
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/shop/product/:id",
        element: <ProductDetails />,
      },
      {
        // ROUTES FOR LOGGED IN USER.
        element: <UserRoutes />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
        ],
      },
      {
        // ADMIN ROUTES.
        element: <AdminRoutes />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={ROUTER} />;
}

export default App;
