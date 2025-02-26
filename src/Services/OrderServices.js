// CUSTOM IMPORTS
import { REQUEST } from "./APISetup";

// ROUTES CONSTANT IMPORT
import ROUTES from "../Constants/Routes.json";
import { createAsyncThunk } from "@reduxjs/toolkit";

// USER ORDER THUNKS SERVICES
export const getMyORDERS = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await REQUEST.get(`${ROUTES.USER.ORDER}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed fetching your ORDERS!"
      );
    }
  }
);

export const createORDER = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await REQUEST.post(`${ROUTES.USER.ORDER}`, order);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed creating your ORDER!"
      );
    }
  }
);

export const getOrderDETAILS = createAsyncThunk(
  "order/orderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await REQUEST.get(`${ROUTES.USER.ORDER}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed getting your Order Details!"
      );
    }
  }
);

// ADMIN'S ORDER THUNK SERVICES
export const getAllORDERS = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await REQUEST.get(`${ROUTES.ADMIN.ORDER}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders!");
    }
  }
);

export const updateOrderSTATUS = createAsyncThunk(
  "order/updateOrderStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await REQUEST.patch(`${ROUTES.ADMIN.ORDER}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update order status!"
      );
    }
  }
);

export const deleteORDER = createAsyncThunk(
  "order/deleteOrders",
  async (id, { rejectWithValue }) => {
    try {
      const response = await REQUEST.delete(`${ROUTES.ADMIN.ORDER}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete the order!"
      );
    }
  }
);
