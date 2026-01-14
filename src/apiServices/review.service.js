import REQUEST from "../apiServices/axois";
import ROUTES from "../Constants/Routes.json";

export const reviewService = {
  addReview(payload, productId) {
    return REQUEST.post(
      ROUTES.REVIEW.ADD.replace(":productId", productId),
      payload
    );
  },

  deleteReview(reviewId) {
    return REQUEST.delete(ROUTES.REVIEW.REMOVE.replace(":reviewId", reviewId));
  },

  getAllReviewsofProduct(productId) {
    return REQUEST.get(
      ROUTES.REVIEW.REVIEWS_BY_PRODUCT_ID.replace(":productId", productId)
    );
  },

  reviewById(reviewId) {
    return REQUEST.get(
      ROUTES.REVIEW.REVIEW_BY_ID.replace(":reviewId", reviewId)
    );
  },
};
