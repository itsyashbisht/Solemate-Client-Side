import { createSlice } from "@reduxjs/toolkit";
import { getStripeApiKEY, processPAYMENT } from "../Services/PaymentServices";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    clientSecret: [],
    stripeKey: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStripeApiKEY.pending, (state) => (state.status = "loading"))
      .addCase(getStripeApiKEY.fulfilled, (state, action) => {
        state.status = "successful";
        state.stripeKey = action.payload;
      })
      .addCase(getStripeApiKEY.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(processPAYMENT.pending, (state) => (state.status = "loading"))
      .addCase(processPAYMENT.fulfilled, (state, action) => {
        state.status = "successful";
        state.clientSecret = action.payload;
      })
      .addCase(processPAYMENT.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
