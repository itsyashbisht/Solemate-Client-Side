// CUSTOM IMPORTS
import { REQUEST } from "./APISetup";
import { toast } from "react-toastify";

// ROUTES CONSTANT IMPORT
import ROUTES from "../Constants/Routes.json";

// USER'S ORDER SERVICES
export async function getMyOrders() {
  try {
    const response = await REQUEST.get(`${ROUTES.USER.ORDER}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function createOrder(order) {
  try {
    const response = await REQUEST.post(`${ROUTES.USER.ORDER}`, order);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function getOrderDetails(id) {
  try {
    const response = await REQUEST.get(`${ROUTES.USER.ORDER}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}
