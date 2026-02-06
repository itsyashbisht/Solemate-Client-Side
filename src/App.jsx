// CUSTOM IMPORTS
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import About from './Pages/About';
import Cart from './Pages/Cart';
import CheckoutPage from './Pages/Checkout';
import ContactPage from './Pages/ContactPage.jsx';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProductDetails from './Pages/ProductDetails';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import Shop from './Pages/Shop';
import AdminRoutes from './Routes/AdminRoutes';
import ProtectedRoute from './Routes/UserRoutes';
import ProductsView from '@/components/ProductsView.jsx';
import UserView from '@/components/UserView.jsx';
import SettingView from '@/components/SettingView.jsx';
import OrdersView from '@/components/OrderView.jsx';

// ROUTING
const ROUTER = createBrowserRouter([
  {
    path: 'login',
    element: <Login/>,
  },
  {
    path: 'register',
    element: <Register/>,
  },
  {
    path: 'shop',
    element: <Shop/>,
  },
  {
    // PARENT ROUTE
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },

      {
        path: 'about',
        element: <About/>,
      },
      {
        path: 'contact',
        element: <ContactPage/>,
      },
      {
        path: 'shop/product/:productId',
        element: <ProductDetails/>,
      },
      {
        // ROUTES FOR LOGGED IN USER.
        element: <ProtectedRoute/>,
        children: [
          {
            path: 'cart',
            element: <Cart/>,
          },
          {
            path: 'profile',
            element: <Profile/>,
          },
          {
            path: 'cart/checkout',
            element: <CheckoutPage/>,
          },
        ],
      },
      {
        // ADMIN ROUTES.
        path: 'admin',
        element: <AdminRoutes/>,
        children: [
          {
            path: 'dashboard',
            element: <OrdersView/>,
          },
          {
            path: 'products',
            element: <ProductsView/>
          },
          {
            path: 'users',
            element: <UserView/>,
          },
          {
            path: 'settings',
            element: <SettingView/>,
          }
        ],
      },
    ],
  },
]);

function App () {
  return <RouterProvider router={ROUTER}/>;
}

export default App;
