//  CUSTOM IMPORTS
import { REQUEST } from "./APISetup";
import { toast } from "react-toastify";

// ROUTES CONSTANT IMPORT
import ROUTES from "../Constants/Routes.json";

// GET STRIPE API-KEY
export async function getStripeAPIKey() {
  try {
    const response = await REQUEST.get(`${ROUTES.USER.PAYMENT}/stripe/api-key`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// TO PROCESS THE PAYMENT
export async function processPayment() {
  try {
    const response = await REQUEST.post(`${ROUTES.USER.PAYMENT}/process`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}
