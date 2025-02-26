// CUSTOM IMPORTS
import { REQUEST } from "./APISetup";

// ROUTES CONSTANTS IMPORT
import ROUTES from "../Constants/Routes.json";
import { createAsyncThunk } from "@reduxjs/toolkit";

// CREATE CART THUNK
export const createCART = createAsyncThunk(
  "cart/createCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await REQUEST.get(`${ROUTES.USER.CART}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed creating the CART!"
      );
    }
  }
);

// UPDATE CART THUNK
export const updateCART = createAsyncThunk(
  "cart/updateCart",
  async (userID, productID, { rejectWithValue }) => {
    try {
      const response = await REQUEST.put(
        `${ROUTES.USER.CART}:${userID}/:${productID}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed updating the CART!"
      );
    }
  }
);
