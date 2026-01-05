import REQUEST from "../apiServices/axois";
import ROUTES from "../Constants/Routes.json";

export const productService = {
  createProduct(payload) {
    return REQUEST.post(ROUTES.PRODUCT.CREATE, payload);
  },

  getProductById(productId) {
    return REQUEST.get(
      ROUTES.PRODUCT.PRODUCT_BY_ID.replace(":productID", productId)
    );
  },

  deleteProduct(productId) {
    return REQUEST.delete(
      ROUTES.PRODUCT.DELETE.replaceAll(":productID", productId)
    );
  },

  updateProductDetails(payload, productId) {
    return REQUEST.patch(
      ROUTES.PRODUCT.UPDATE_DETAILS.replace(":productId", productId),
      payload
    );
  },

  updateProductImages(payload, productId) {
    return REQUEST.patch(
      ROUTES.PRODUCT.UPDATE_IMAGES.replace(":productId", productId),
      payload
    );
  },

  getAllProducts() {
    return REQUEST.get(ROUTES.PRODUCT.GET_ALL_PRODUCT);
  },
};
