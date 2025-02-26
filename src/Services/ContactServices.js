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

// ADMIN SERVCISE
export async function getAllContacts() {
  try {
    const response = await REQUEST.get(`${ROUTES.ADMIN.CONTACT}/`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function getContactDetails(id) {
  try {
    const response = await REQUEST.get(`${ROUTES.ADMIN.CONTACT}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function contactStatus(id, orderStatus) {
  try {
    const response = await REQUEST.patch(
      `${ROUTES.ADMIN.CONTACT}/${id}`,
      orderStatus
    );
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function deleteContactDetails(id) {
  try {
    const response = await REQUEST.delete(`${ROUTES.ADMIN.CONTACT}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}
