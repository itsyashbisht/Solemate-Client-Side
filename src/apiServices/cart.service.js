import REQUEST from "./axios";
import ROUTES from "../Constants/Routes.json";

export const cartService = {
  // GET USER CART.
  getCart() {
    return REQUEST.get(ROUTES.CART.GET_CART);
  },

  // ADD ITEM TO CART.
  addItem(productId, payload) {
    return REQUEST.post(
      ROUTES.CART.ADD_ITEM.replace(":productId", productId),
      payload,
    );
  },

  // REMOVE ITEM FROM CART.
  removeItem(productId, payload) {
    return REQUEST.delete(
      ROUTES.CART.REMOVE_ITEM.replace(":productId", productId),
      {
        data: payload,
      },
    );
  },

  // UPDATE ITEM QUANTITY.
  updateItemQuantity(productId, payload) {
    return REQUEST.patch(
      ROUTES.CART.UPDATE_ITEM_QUANTITY.replace(":productId", productId),
      payload,
    );
  },

  // CLEAR CART.
  clearCart() {
    return REQUEST.delete(ROUTES.CART.CLEAR_CART);
  },
};
