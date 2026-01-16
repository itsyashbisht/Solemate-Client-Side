// CUSTOM IMPORTS
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import ContactPage from "./Pages/Contact";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ProductDetails from "./Pages/PorductDetails";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";
import AdminRoutes from "./Routes/AdminRoutes";
import ProtectedRoute from "./Routes/UserRoutes";

// ROUTING
const ROUTER = createBrowserRouter([
  {
    // PARENT ROUTE
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "shop/product/:id",
        element: <ProductDetails />,
      },
      {
        // ROUTES FOR LOGGED IN USER.
        element: <ProtectedRoute />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
      {
        // ADMIN ROUTES.
        element: <AdminRoutes />,
        children: [
          {
            path: "admin/dashboard",
            // element: <Cart />,
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
