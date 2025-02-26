// CUSTOM IMPORTS
import { toast } from "react-toastify";
import { REQUEST } from "./APISetup";

// ROUTES CONSTANTS IMPORT
import ROUTES from "../Constants/Routes.json";

// USER SERVICES
export async function User() {
  try {
    const response = await REQUEST.get(`${ROUTES.USER}/me`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function UpdateUserDetails(userDetails) {
  try {
    const response = await REQUEST.put(`${ROUTES.USER}/update`, userDetails);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// ADMIN SERVICES.
export async function getAllUsers() {
  try {
    const response = await REQUEST.get(`${ROUTES.ADMIN.USER}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function getUserDetails(id) {
  try {
    const response = await REQUEST.get(`${ROUTES.ADMIN.USER}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function updateUSERrole(id, role) {
  try {
    const response = await REQUEST.patch(`${ROUTES.ADMIN.USER}/id`, role);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

export async function deleteUSER(id) {
  try {
    const response = await REQUEST.delete(`${ROUTES.ADMIN.USER}/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}
