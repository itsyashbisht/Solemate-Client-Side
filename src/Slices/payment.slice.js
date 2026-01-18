import { createSlice } from "@reduxjs/toolkit";
import { getRazorpayKeyId, verifyPayment } from "../thunks/payment.thunk";

const initialState = {
  razorpayKeyId: null,
  loading: false,
  verfying: false,
  success: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // RESET AFTER SUCCESS / WHEN LEAVING PAGE.
    resetPaymentState(state) {
      state.verfying = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.verfying = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.verfying = false;
        state.success = true;
        state.error = null;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verfying = false;
        state.error = action.payload;
      })
      .addCase(getRazorpayKeyId.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getRazorpayKeyId.fulfilled, (state, action) => {
        state.loading = false;
        state.razorpayKeyId = action.payload?.data?.razorpayKeyId;
      })
      .addCase(getRazorpayKeyId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
