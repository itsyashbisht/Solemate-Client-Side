import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getMe, updateUserDetails } from '../thunks/user.thunk'
import { logoutUser } from "../thunks/auth.thunk";

const initialState = {
  allUsers: [],
  profile: null,
  loading: false,
  error: null,
  initialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // UPDATE USER DETAILS
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ME
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.initialized = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action?.payload;
        state.initialized = true;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.users;
      })
      .addCase(getAllUsers.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT - CLEAR PROFILE
      .addCase(logoutUser.fulfilled, (state) => {
        state.profile = null;
        state.error = null;
      });
  },
});

export const { clearUserError, setInitialized } = userSlice.actions;
export default userSlice.reducer;
