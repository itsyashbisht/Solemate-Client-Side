import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth.slice";
import cartReducer from "./Slices/cart.slice";
import orderReducer from "./Slices/order.slice";
import paymentReducer from "./Slices/payment.slice";
import productReducer from "./Slices/product.slice";
import userReducer from "./Slices/user.slice";
import reviewReducer from "./Slices/review.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
    payment: paymentReducer,
    product: productReducer,
    review: reviewReducer,
  },
});

export default store;
