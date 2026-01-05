// CUSTOM IMPORTS
import REQUEST from "./axois";
import ROUTES from "../Constants/Routes.json";

export const orderService = {
  // CREATE ORDER
  createOrder(payload) {
    return REQUEST.post(ROUTES.ORDER.CREATE_ORDER, payload);
  },

  getMyOrders() {
    return REQUEST.get(ROUTES.ORDER.GET_MY_ORDERS);
  },

  getOrderById(orderId) {
    return REQUEST.get(
      ROUTES.ORDER.GET_ORDER_BY_ID.replace(":orderId", orderId)
    );
  },

  cancelOrder(orderId) {
    return REQUEST.patch(
      ROUTES.ORDER.CANCEL_ORDER.replace(":orderId", orderId)
    );
  },

  // ADMIN SERVICES
  getAllOrders(params = {}) {
    return REQUEST.get(ROUTES.ORDER.GET_ALL_ORDERS, {
      params,
    });
  },

  updateOrderStatus(orderId, payload) {
    return REQUEST.patch(
      ROUTES.ORDER.UPDATE_ORDER_STATUS.replace(":orderId", orderId),
      payload
    );
  },
};
