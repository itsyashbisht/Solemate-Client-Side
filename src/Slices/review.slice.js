import { createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  deleteReview,
  getAllReviewsOfProduct,
  getReviewById,
} from "./review.thunks";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviews(state) {
      state.reviews = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL REVIEWS OF PRODUCT
      .addCase(getAllReviewsOfProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviewsOfProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload?.data || [];
      })
      .addCase(getAllReviewsOfProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD REVIEW
      .addCase(addReview.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.reviews.unshift(action.payload.data);
        }
      })

      // DELETE REVIEW
      .addCase(deleteReview.fulfilled, (state, action) => {
        const reviewId = action.payload?.reviewId;
        state.reviews = state.reviews.filter(
          (review) => review._id !== reviewId
        );
      })

      // GET REVIEW BY ID (OPTIONAL USE)
      .addCase(getReviewById.fulfilled, (state, action) => {
        const review = action.payload?.data;
        if (!review) return;

        // CHECK WHETHER IT EXISTS IN REVIEWS, PUSH IT IF NOT EXISTS ALREADY
        const exists = state.reviews.find((r) => r._id === review._id);
        if (!exists) {
          state.reviews.push(review);
        }
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
