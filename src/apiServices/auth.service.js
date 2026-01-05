import REQUEST from "../ROUTESServices/axois";
import ROUTES from "../Constants/Routes.json";

export const authService = {
  register(payload) {
    return REQUEST.post(ROUTES.USER.REGISTER, payload);
  },

  login(payload) {
    return REQUEST.post(ROUTES.USER.LOGIN, payload);
  },

  logout() {
    return REQUEST.post(ROUTES.USER.LOGOUT);
  },

  forgotPassword(payload) {
    return REQUEST.post(ROUTES.USER.CHANGE_PASSWORD, payload);
  },
};
