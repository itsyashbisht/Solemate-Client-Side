import { createAsyncThunk } from "@reduxjs/toolkit";
import { reviewService } from "../../apiServices/review.service";

// ADD REVIEW
export const addReview = createAsyncThunk(
  "review/add",
  async ({ productId, payload }, { rejectWithValue }) => {
    try {
      const response = await reviewService.addReview(payload, productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add review"
      );
    }
  }
);

// DELETE REVIEW
export const deleteReview = createAsyncThunk(
  "review/delete",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await reviewService.deleteReview(reviewId);
      return { reviewId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

// GET ALL REVIEWS OF A PRODUCT
export const getAllReviewsOfProduct = createAsyncThunk(
  "review/getAllByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await reviewService.getAllReviewsofProduct(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

// GET REVIEW BY ID
export const getReviewById = createAsyncThunk(
  "review/getById",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await reviewService.reviewById(reviewId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch review"
      );
    }
  }
);
