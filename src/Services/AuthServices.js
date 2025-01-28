// CUSTOM IMPORTS
import { REQUEST } from "./APISetup";
import { toast } from "react-toastify";

// ROUTES CONSTANTS IMPORT
import ROUTES from "../Constants/Routes.json";

// REGISTER USER
export async function registerUser(userCredentitals) {
  try {
    const response = await REQUEST.post(
      `${ROUTES.AUTHENTICATION.REGISTER}`,
      userCredentitals
    );
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// LOGIN USER
export async function loginUser(LOGINCredentitals) {
  try {
    const response = await REQUEST.post(
      `${ROUTES.AUTHENTICATION.LOGIN}`,
      LOGINCredentitals
    );
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// LOGOUT USER
export async function logoutUser() {
  try {
    const response = await REQUEST.get(`${ROUTES.AUTHENTICATION.LOGOUT}`);
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// FORGOT PASSWORD
export async function forgotPassword(USERMAIL) {
  try {
    const response = await REQUEST.post(
      `${ROUTES.AUTHENTICATION.FORGOTPASSWORD}`,
      USERMAIL
    );
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// RESET PASSWORD
export async function resetPassword(ID, password) {
  try {
    const response = await REQUEST.patch(
      `${ROUTES.AUTHENTICATION.RESETPASSWORD}/${ID}`,
      password
    );
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}

// VERIFY USER ACCOUNT
export async function verifyAccount(ID) {
  try {
    const response = await REQUEST.get(
      `${ROUTES.AUTHENTICATION.VERIFYACCOUNT}/${ID}`
    );
    return response.data;
  } catch (error) {
    toast.error(`ERROR: ${error.message}`);
  }
}
