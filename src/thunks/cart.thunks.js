import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../apiServices/cart.service";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, payload }, { rejectWithValue }) => {
    try {
      const response = await cartService.addItem(productId, payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart",
      );
    }
  },
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ productId, payload }, { rejectWithValue }) => {
    try {
      const response = await cartService.removeItem(productId, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item from the cart",
      );
    }
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, payload }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateItemQuantity(productId, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update Item's quantity in the cart",
      );
    }
  },
);

export const clearUserCart = createAsyncThunk(
  "clearUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.clearCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);
