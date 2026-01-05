import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../apiServices/auth.service";
import { toast } from "react-toastify";

// ASYNC THUNK FOR LOGIN
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (Credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(Credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login Failed");
    }
  }
);

// ASYNC THUNK FOR LOGOUT
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await logoutUser();
    toast.success("Logged out successfully!");
    return response;
  } catch (error) {
    toast.error("Logout Failed");
    throw error;
  }
});

// ASYNC THUNK FOR REGISTER NEW USER.
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (Credentials, { rejectWithValue }) => {
    try {
      const response = await registerUser(Credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed Register");
    }
  }
);

// AUTH REDUCER SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    role: null, //ADMIN OR USER
    user: null, // STORE USER DETAILS
    status: "idle", // IDLE | LOADING | SUCCEEDED | FAILED
    error: null,
  },
  reducers: {
    setUserRole(state, action) {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.status = "succeeded!";
        toast.success("Login successful!");
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Invalid login credentials");
      })

      // LOGOUT REDUCERS
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
        state.status = "idle";
      });
  },
});

export const { setUserRole } = authSlice.actions;
export default authSlice.reducer;
