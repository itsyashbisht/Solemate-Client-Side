import REQUEST from "./axios";
import ROUTES from "../Constants/Routes.json";

export const paymentService = {
  verifyPayment(payload) {
    return REQUEST.post(ROUTES.PAYMENT.VERIFY, payload);
  },

  getRazorpayKeyId() {
    return REQUEST.get(ROUTES.PAYMENT.GET_RAZORPAY_KEY_ID);
  },
};
