import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import cartReducer from "./slices/cart.slice";
import orderReducer from "./slices/order.slice";
import paymentReducer from "./slices/payment.slice";
import productReducer from "./slices/product.slice";
import reviewReducer from "./slices/review.slice";
import userReducer from "./slices/user.slice";

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
