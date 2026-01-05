import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../apiServices/user.service";

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await userService.updateDetails(payload);
      return response.data;
    } catch (error) {
      rejectWithValue(
        error.response?.data?.message || "Failed to update user details"
      );
    }
  }
);
