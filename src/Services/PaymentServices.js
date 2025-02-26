//  CUSTOM IMPORTS
import { REQUEST } from "./APISetup";

// ROUTES CONSTANT IMPORT
import ROUTES from "../Constants/Routes.json";
import { createAsyncThunk } from "@reduxjs/toolkit";

// GET STRIPE API-KEY
export const getStripeApiKEY = createAsyncThunk(
  "payment/getKey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await REQUEST.get(
        `${ROUTES.USER.PAYMENT}/stripe/api-key`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Stripe KEY!"
      );
    }
  }
);

// TO PROCESS THE PAYMENT
export const processPAYMENT = createAsyncThunk(
  "payment/process",
  async (_, { rejectWithValue }) => {
    try {
      const response = await REQUEST.post(`${ROUTES.USER.PAYMENT}/process`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Unable to process the PAYMENT!"
      );
    }
  }
);
