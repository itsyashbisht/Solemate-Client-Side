// CUSTOM IMPORTS
import { toast } from "react-toastify";
import { REQUEST } from "./APISetup";

// ROUTES CONSTANTS IMPORT
import ROUTES from "../Constants/Routes.json";

// FETCH ALL PRODUCTS
export async function getAllProducts() {
  try {
    const response = await REQUEST.get(`${ROUTES.USER.PRODUCT}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// FETCH PRODUCT DETAILS
export async function getProductDetailsById(id) {
  try {
    const response = await REQUEST.get(`${ROUTES.USER.PRODUCT}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// ADD OR UPDATE PRODUCT REVIEW
export async function productReview(id, review) {
  try {
    const response = await REQUEST.put(`${ROUTES.USER.REVIEW}/${id}`, review);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// DELETE PRODUCT REVIEW
export async function deleteReview(id) {
  try {
    const response = await REQUEST.delete(`${ROUTES.USER.REVIEW}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}
