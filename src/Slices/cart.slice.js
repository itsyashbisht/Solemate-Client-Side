import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToCart,
  clearUserCart,
  fetchCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../thunks/cart.thunks";

const initialState = {
  items: [],
  subtoal: 0,
  tax: 0,
  discount: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH CART.
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.items = action.payload?.items;
        state.totalAmount = action.payload?.totalAmount;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD TO CART.
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = [...state.items, action.payload.items];
      })

      // REMOVE ITEM.
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload.data[0]._id,
        );
      })

      // UPDATE CART ITEM's QUANTITY
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.items = action.payload?.items || state.items;
      })

      // CLEAR CART
      .addCase(clearUserCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
