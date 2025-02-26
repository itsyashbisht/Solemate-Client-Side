import { createSlice } from "@reduxjs/toolkit";
import { createCART, updateCART } from "../Services/CartServices";

// CART REDUCER SLICE
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addItem(state, action) {
      // PAYLOAD === CART ITEM
      state.cartItems.push(action.payload);
    },
    deleteItem(state, action) {
      // PAYLOAD = ITEM ID
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increaseItemQuantity(state, action) {
      // PAYLOAD = ITEM ID
      // SELECTING ITEM
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item) return;

      item.quantity++;
      item.totalPirce = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // PAYLOAD = ITEM ID
      // SELECTING ITEM
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item || item.quantity < 1) return;

      item.quantity--;
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // CASES FOR CREATE-CART.
      .addCase(createCART.pending, (state) => (state.status = "loading"))
      .addCase(createCART.fulfilled, (state, action) => {
        state.status = "successful";
        state.cartItems = action.payload;
      })
      .addCase(createCART.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // CASES FOR UPDATE-CART.
      .addCase(updateCART.pending, (state) => (state.status = "loading"))
      .addCase(updateCART.fulfilled, (state, action) => {
        state.status = "successful";
        state.cartItems = action.payload;
      })
      .addCase(updateCART.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// TO DO : GETTOTAL PRICE FUNCTION.

export default cartSlice.reducer;
export const {
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  addItem,
  getTotalCartPrice,
  getTotalQuantity,
} = cartSlice.actions;
