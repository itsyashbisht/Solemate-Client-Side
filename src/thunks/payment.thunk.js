import { createAsyncThunk } from "@reduxjs/toolkit";
import { paymentService } from "../apiServices/payment.service";

export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await paymentService.verifyPayment(payload);
      return response.data;
    } catch (error) {
      rejectWithValue(
        error.response?.data?.message || "Failed to verify payment"
      );
    }
  }
);
