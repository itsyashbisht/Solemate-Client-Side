// CUSTOM IMPORTS
import { toast } from "react-toastify";
import { REQUEST } from "./APISetup";

// ROUTES CONSTANTS IMPORT
import ROUTES from "../Constants/Routes.json";

// CREATE USER CART
export async function createCART() {
  try {
    const response = await REQUEST.get(`${ROUTES.USER.CART}`);
    return response.data;
  } catch (error) {
    toast.error("ERROR :", error.message);
  }
}

// UPDATE THE USER CART
export async function updateCART(userID, productID) {
  try {
    const response = await REQUEST.put(
      `${ROUTES.USER.CART}:${userID}/:${productID}`
    );
    return response.data;
  } catch (error) {
    toast.error("ERROR :", error.message);
  }
}
