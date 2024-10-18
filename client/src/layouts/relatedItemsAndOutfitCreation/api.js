import axios from 'axios';

const API_ENDPOINTS = {
  OUTFIT: '/outfit',
  PRODUCT_INFORMATION: (productId) => `/products/${productId}/information`,
  PRODUCT_STYLES: (productId) => `/products/${productId}/styles`,
  REVIEW_META: (productId) => `/reviews/meta?product_id=${productId}`,
};

class ApiError extends Error {
  constructor(message, error) {
    super(message);
    this.name = 'ApiError';
    this.originalError = error;
  }
}

const handleApiCall = async (apiCall, errorMessage) => {
  try {
    return await apiCall();
  } catch (error) {
    throw new ApiError(errorMessage, error);
  }
};

const fetchApiData = (url) =>
  handleApiCall(
    () => axios.get(url).then(({ data }) => data),
    `Failed to fetch data from ${url}`,
  );

export const fetchRelatedProducts = async (productId) => {
  if (!productId) productId = '40344';
  const { data } = await axios.get(`/products/${productId}/related`);
  return data.map((id) => String(id));
};

export const fetchOutfitProductIds = () =>
  handleApiCall(
    () =>
      fetchApiData(API_ENDPOINTS.OUTFIT).then((data) =>
        data.map(({ id }) => id),
      ),
    'Failed to fetch outfit product IDs',
  );

export const addProductByIdToOutfit = (productId) => {
  if (!productId) throw new Error('Product ID is required');
  return handleApiCall(
    () =>
      axios
        .post(API_ENDPOINTS.OUTFIT, { id: productId })
        .then(({ data }) => data),
    `Failed to add product ${productId} to outfit`,
  );
};

export const removeProductByIdFromOutfit = (productId) => {
  if (!productId) throw new Error('Product ID is required');
  return handleApiCall(
    () =>
      axios
        .delete(`${API_ENDPOINTS.OUTFIT}/${productId}`)
        .then(({ data }) => data),
    `Failed to remove product ${productId} from outfit`,
  );
};

export const fetchProductFeaturesById = (productId) => {
  if (!productId) throw new Error('Product ID is required');
  return handleApiCall(
    () =>
      fetchApiData(API_ENDPOINTS.PRODUCT_INFORMATION(productId)).then(
        (data) => data.features,
      ),
    `Failed to fetch features for product ${productId}`,
  );
};

export const fetchProductInformationById = (productId) => {
  if (!productId) throw new Error('Product ID is required');
  return handleApiCall(
    () =>
      axios
        .get(API_ENDPOINTS.PRODUCT_INFORMATION(productId))
        .then(({ data }) => data),
    `Failed to fetch product information for ${productId}`,
  );
};

export const fetchCompleteProductDataById = (productId) => {
  if (!productId) throw new Error('Product ID is required');
  return handleApiCall(
    () =>
      Promise.all([
        fetchApiData(API_ENDPOINTS.PRODUCT_INFORMATION(productId)),
        fetchApiData(API_ENDPOINTS.PRODUCT_STYLES(productId)),
        fetchApiData(API_ENDPOINTS.REVIEW_META(productId)),
      ]).then(([productInfo, styleInfo, reviewMeta]) => ({
        productInfo,
        styleInfo,
        reviewMeta,
      })),
    `Failed to fetch complete product data for ${productId}`,
  );
};
