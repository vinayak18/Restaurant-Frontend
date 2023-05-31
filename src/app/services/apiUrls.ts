const productserviceUrl = '/productserviceurl/api/v1';
const userserviceUrl = '/userserviceurl/api/v1';

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
  },
  productUrls: {
    all: `${productserviceUrl}/product/all`,
    byId: `${productserviceUrl}/product/{pid}`,
    byFoodType: `${productserviceUrl}/product/type/{foodtype}`,
    bestseller: `${productserviceUrl}/product/bestseller/{pid}`,
    add: `${productserviceUrl}/verify/product/add`,
    update: `${productserviceUrl}/verify/product/update`,
    delete: `${productserviceUrl}/verify/product/delete/`,
    changeLiveStatus: `${productserviceUrl}/verify/product/update/status/`,
  },
  reviewUrls: {
    byId: `${productserviceUrl}/verify/{pid}/review`,
    add: `${productserviceUrl}/verify/{pid}/review/add`,
    update: `${productserviceUrl}/verify/{pid}/review/update`,
    delete: `${productserviceUrl}/verify/{pid}/review/delete`,
  },
};
