import { createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
} from "../thunks/order.thunk";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload?.data || null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MY ORDERS.
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload?.data || [];
      })

      // GET ORDER BY ID
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload?.data;
      })

      // CANCEL ORDER
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.currentOrder = action.payload?.data;
      })

      // ADMIN: ALL ORDERS
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload?.data || [];
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADMIN: UPDATE STATUS
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.currentOrder = action.payload?.data || state.currentOrder;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
