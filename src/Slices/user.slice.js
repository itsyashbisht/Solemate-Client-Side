import { createSlice } from "@reduxjs/toolkit";
import { getMe, updateUserDetails } from "../thunks/user.thunk";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
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
          ...action.payload?.data,
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
      })
      .addCase(getMe.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.profile = action?.payload?.data;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
