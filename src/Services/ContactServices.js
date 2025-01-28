//  CUSTOM IMPORTS
import { REQUEST } from "./APISetup";
import { toast } from "react-toastify";

// ROUTES CONSTANT IMPORTS
import ROUTES from "../Constants/Routes.json";

export async function createContact(contactDetails) {
  try {
    const response = await REQUEST.post(
      `${ROUTES.USER.CONTACT}`,
      contactDetails
    );
    return response.data;
  } catch (error) {
    toast.error("ERROR :", error.message);
  }
}
