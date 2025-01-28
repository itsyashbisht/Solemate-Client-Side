// CUSTOM IMPORTS
import { toast } from "react-toastify";
import { REQUEST } from "./APISetup";

// ROUTES CONSTANTS IMPORT
import ROUTES from "../Constants/Routes.json";

// ACCESS USER DETAILS
export async function User() {
  try {
    const response = await REQUEST.get(`${ROUTES.USER}/me`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// UPDATE USER DETAILS
export async function UpdateUserDetails(userDetails) {
  try {
    const response = await REQUEST.put(`${ROUTES.USER}/update`, userDetails);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}
