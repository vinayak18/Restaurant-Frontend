const productserviceUrl = '/productserviceurl/api/v1';

/* eslint-disable import/prefer-default-export */
export const urls = {
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
