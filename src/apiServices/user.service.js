import REQUEST from "../apiServices/axois";
import ROUTES from "../Constants/Routes.json";

export const userService = {
  updateDetails(payload) {
    return REQUEST.post(ROUTES.USER.UPDATE_DETAILS, payload);
  },
};
