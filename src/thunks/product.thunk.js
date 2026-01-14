import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "../apiServices/product.service";

// GET PRODUCT BY ID
export const getProductById = createAsyncThunk(
  "product/getById",
  async (productId, { rejectWithValue }) => {
    try {
      // GET request expects params, not body
      const response = await productService.getProductById(productId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all products"
      );
    }
  }
);

// ADMIN THUNKS.
// CREATE PRODUCT
export const createProduct = createAsyncThunk(
  "product/create",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await productService.createProduct(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productService.deleteProduct(productId);
      return { productId, data: response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

// UPDATE PRODUCT DETAILS
export const updateProductDetails = createAsyncThunk(
  "product/updateDetails",
  async ({ productId, payload }, { rejectWithValue }) => {
    try {
      const response = await productService.updateProductDetails(
        payload,
        productId
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product details"
      );
    }
  }
);

// UPDATE PRODUCT IMAGES
export const updateProductImages = createAsyncThunk(
  "product/updateImages",
  async ({ productId, payload }, { rejectWithValue }) => {
    try {
      const response = await productService.updateProductImages(
        payload,
        productId
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product images"
      );
    }
  }
);
