import { createSlice } from "@reduxjs/toolkit";
import {
  deleteORDER,
  getAllORDERS,
  updateOrderSTATUS,
} from "../Services/OrderServices";

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllORDERS.pending, (state) => (state.status = "loading"))
      .addCase(getAllORDERS.fulfilled, (state, action) => {
        state.status = "successful";
        state.orders = action.payload;
      })
      .addCase(getAllORDERS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(deleteORDER.pending, (state) => (state.status = "loading"))
      .addCase(deleteORDER.fulfilled, (state, action) => {
        state.status = "successful";
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(deleteORDER.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(updateOrderSTATUS.pending, (state) => (state.status = "loading"))
      .addCase(updateOrderSTATUS.fulfilled, (state, action) => {
        state.status = "successful";
        const selectedOrder = state.orders.find(
          (order) => order.id === action.payload.id
        );

        if (selectedOrder) {
          selectedOrder.status = action.payload.status;
        }
      })
      .addCase(updateOrderSTATUS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminOrderSlice.reducer;
