import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../apiServices/user.service";

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userService.updateDetails(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user details",
      );
    }
  },
);

export const getMe = createAsyncThunk(
  "user/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getME();
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get your details",
      );
    }
  },
);
