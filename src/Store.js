import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import productReducer from "./Slices/ProductsSlice";
import orderReducer from "./Slices/UserOrderSlice";
import adminOrderReducer from "./Slices/AdminOrderSlice";

const store = configureStore({
  reducer: {
    Auth: authReducer,
    Product: productReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
  },
});

export default store;
