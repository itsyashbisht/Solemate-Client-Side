import { createSlice } from "@reduxjs/toolkit";
import { verifyPayment } from "../thunks/payment.thunk";

const initialState = {
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
        state.error = null;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verfying = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
