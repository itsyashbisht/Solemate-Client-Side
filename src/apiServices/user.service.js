import REQUEST from "./axios";
import ROUTES from "../Constants/Routes.json";

export const userService = {
  updateDetails(payload) {
    return REQUEST.post(ROUTES.USER.UPDATE_DETAILS, payload);
  },

  getME() {
    return REQUEST.get(ROUTES.USER.GET_ME);
  },
};
