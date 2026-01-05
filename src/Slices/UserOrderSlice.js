import { createSlice } from "@reduxjs/toolkit";
import {
  createORDER,
  getMyORDERS,
  getOrderDETAILS,
} from "../apiServices/order.service";

const userOrderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderDetails: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyORDERS.pending, (state) => (state.status = "loading"))
      .addCase(getMyORDERS.fulfilled, (state, action) => {
        // ACTION PAYLOAD = ORDERS.
        state.status = "successful";
        state.orders = action.payload;
      })
      .addCase(getMyORDERS.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(createORDER.pending, (state) => (state.status = "loading"))
      .addCase(createORDER.fulfilled, (state, action) => {
        // ACTION PAYLOAD = NEW ORDER
        state.status = "successful";
        state.orders.push(action.payload);
      })
      .addCase(createORDER.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      .addCase(getOrderDETAILS.pending, (state) => (state.status = "loading"))
      .addCase(getOrderDETAILS.fulfilled, (state, action) => {
        // ACTION PAYLOAD = ORDER DETAILS.
        state.status = "successful";
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDETAILS.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default userOrderSlice.reducer;
