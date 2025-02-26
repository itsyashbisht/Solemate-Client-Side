// CUSTOM IMPORTS
import { toast } from "react-toastify";
import { REQUEST } from "./APISetup";

// ROUTES CONSTANTS IMPORT
import ROUTES from "../Constants/Routes.json";

// USER SERVICES
export async function getAllProducts() {
  try {
    const response = await REQUEST.get(`${ROUTES.USER.PRODUCT}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function getProductDetailsById(id) {
  try {
    const response = await REQUEST.get(`${ROUTES.USER.PRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function productReview(id, review) {
  try {
    const response = await REQUEST.put(`${ROUTES.USER.REVIEW}/${id}`, review);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function deleteReview(id) {
  try {
    const response = await REQUEST.delete(`${ROUTES.USER.REVIEW}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// ADMIN SERVICES.
export async function updateProduct(id) {
  try {
    const response = REQUEST.put(`${ROUTES.ADMIN.PRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function createProduct() {
  try {
    const response = REQUEST.post(`${ROUTES.ADMIN.PRODUCT}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function deleteProduct(id) {
  try {
    const response = REQUEST.delete(`${ROUTES.ADMIN.PRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function deleteProductReview(id) {
  try {
    const response = REQUEST.delete(`${ROUTES.ADMIN.REVIEW}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}
