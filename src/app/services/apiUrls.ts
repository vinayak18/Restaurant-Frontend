const productserviceUrl = '/productserviceurl/api/v1';
const userserviceUrl = '/userserviceurl/api/v1';

/* eslint-disable import/prefer-default-export */
export const urls = {
  userUrls: {
    login: `${userserviceUrl}/auth/user/login`,
    socialGoogleLogin: `${userserviceUrl}/auth/google/login`,
    register: `${userserviceUrl}/auth/user/register`,
    byEmail: `${userserviceUrl}/verify/user/email/{email}`,
    byId: `${userserviceUrl}/verify/user/id/{id}`,
  },
  productUrls: {
    all: `${productserviceUrl}/product/all`,
    byId: `${productserviceUrl}/product/{id}`,
    add: `${productserviceUrl}/product/add`,
    update: `${productserviceUrl}/product/update`,
    delete: `${productserviceUrl}/product/delete/`,
    changeLiveStatus: `${productserviceUrl}/product/update/status/`,
  },
  reviewUrls: {
    byId: `${productserviceUrl}/{pid}/review`,
    add: `${productserviceUrl}/{pid}/review/add`,
    update: `${productserviceUrl}/{pid}/review/update`,
    delete: `${productserviceUrl}/{pid}/review/delete`,
  },
};
