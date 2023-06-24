const productserviceUrl = '/productserviceurl/api/v1';
const userserviceUrl = '/userserviceurl/api/v1';
const feedbackserviceUrl = '/feedbackserviceurl/api/v1';

/* eslint-disable import/prefer-default-export */
export const urls = {
  userUrls: {
    login: `${userserviceUrl}/auth/user/login`,
    socialFbLogin: `${userserviceUrl}/auth/facebook/login/{id}`,
    socialGoogleLogin: `${userserviceUrl}/auth/google/login`,
    register: `${userserviceUrl}/auth/user/register`,
    byEmail: `${userserviceUrl}/verify/user/email/{email}`,
    byId: `${userserviceUrl}/verify/user/id/{id}`,
    addToCart: `${userserviceUrl}/verify/user/update/cart/{email}`,
    initiatePayment: `${userserviceUrl}/verify/order/initialize`,
    byOrderId: `${userserviceUrl}/verify/order/retrieve/{id}`,
    activeOrders: `${userserviceUrl}/verify/order/{userId}/active`,
    pastOrders: `${userserviceUrl}/verify/order/{userId}/past`,
    updateOrderRating: `${userserviceUrl}/verify/order/{id}/update/rating/{rating}`,
    updateOrderStatus: `${userserviceUrl}/verify/order/{id}/update/status/{status}`,
  },
  productUrls: {
    all: `${productserviceUrl}/product/all`,
    byId: `${productserviceUrl}/product/{pid}`,
    byFoodType: `${productserviceUrl}/product/type/{foodtype}`,
    bestseller: `${productserviceUrl}/product/bestseller/{pid}`,
    // add: `${productserviceUrl}/verify/product/add`,
    // update: `${productserviceUrl}/verify/product/update`,
    // delete: `${productserviceUrl}/verify/product/delete/{pid}`,
    // changeLiveStatus: `${productserviceUrl}/verify/product/update/status/{pid}`,
  },
  reviewUrls: {
    byId: `${productserviceUrl}/verify/user/{pid}/review`,
    add: `${productserviceUrl}/verify/user/{pid}/review/add`,
    update: `${productserviceUrl}/verify/user/{pid}/review/update`,
    delete: `${productserviceUrl}/verify/user/{pid}/review/delete`,
  },
  couponUrls: {
    byCode: `${userserviceUrl}/verify/user/coupon/retrieve`,
  },
  feedbackUrls: {
    add: `${feedbackserviceUrl}/feedback/add`,
    testimony: `${feedbackserviceUrl}/customer/testimony`,
  },
};
