// CUSTOM IMPORTS
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ProductDetails from "./Pages/PorductDetails";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";
import AdminRoutes from "./Routes/AdminRoutes";
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
