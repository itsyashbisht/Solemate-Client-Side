import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProductDetails,
  updateProductImages,
} from "../thunks/product.thunk";

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearCurrentProduct(state) {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL PRODUCTS (PAGE LEVEL)
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data || [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PRODUCT BY ID (PAGE LEVEL)
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload?.data || null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE PRODUCT (ADMIN MUTATION)
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload?.data) {
          state.products.unshift(action.payload.data);
        }
      })

      // UPDATE PRODUCT DETAILS
      .addCase(updateProductDetails.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated) return;

        // FIND PRODUCT AND REPLACE PRODUCT WITH UPDATED PRODUCT
        state.products = state.products.map((product) =>
          product._id === updated._id ? updated : product,
        );

        if (state.currentProduct?._id === updated._id) {
          state.currentProduct = updated;
        }
      })

      // UPDATE PRODUCT IMAGES
      .addCase(updateProductImages.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (!updated) return;

        if (state.currentProduct?._id === updated._id) {
          state.currentProduct = updated;
        }
      })

      // DELETE PRODUCT
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload?.productId;
        state.products = state.products.filter(
          (product) => product._id !== productId,
        );

        if (state.currentProduct?._id === productId) {
          state.currentProduct = null;
        }
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
