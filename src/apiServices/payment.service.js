import REQUEST from "../apiServices/axois";
import ROUTES from "../Constants/Routes.json";

export const paymenServices = {
  verifyPayment(payload) {
    return REQUEST.post(ROUTES.PAYMENT.VERIFY, payload);
  },
};
