import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/auth.slice.js';
import cartReducer from './Slices/cart.slice.js';
import orderReducer from './Slices/order.slice.js';
import paymentReducer from './Slices/payment.slice.js';
import productReducer from './Slices/product.slice.js';
import reviewReducer from './Slices/review.slice.js';
import userReducer from './Slices/user.slice.js';

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
