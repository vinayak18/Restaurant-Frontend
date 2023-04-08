const productserviceUrl = '/productserviceurl/api/v1';


/* eslint-disable import/prefer-default-export */
export const urls = {
  productUrls: {
    all: `${productserviceUrl}/product/all`,
    byId: `${productserviceUrl}/product`,
    add: `${productserviceUrl}/product/add`,
    update: `${productserviceUrl}/product/update`,
    delete: `${productserviceUrl}/product/delete/`,
    changeLiveStatus: `${productserviceUrl}/product/update/status/`,
  },
  reviewUrls: {
    byId: `${productserviceUrl}/{pId}/review`,
    add: `${productserviceUrl}/{pId}/review/add`,
    update: `${productserviceUrl}/{pId}/review/update`,
    delete: `${productserviceUrl}/{pId}/review/delete`
  },
};
