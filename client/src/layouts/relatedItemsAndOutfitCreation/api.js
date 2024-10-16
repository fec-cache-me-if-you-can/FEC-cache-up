// api.js
import axios from 'axios';

const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const getOutfit = async () => {
  const { data } = await axios.get('/outfit');
  return data.map((product) => product.id);
};

export const addProductToOutfit = async (id) => {
  const { data } = await axios.post('/outfit', { id });
  return data;
};

export const removeProductFromOutfit = async (productId) => {
  const { data } = await axios.delete(`/outfit/${productId}`);
  return data;
};

const getProductInformation = (productId) =>
  fetchData(`/products/${productId}/information`);

const getProductStyles = (productId) =>
  fetchData(`/products/${productId}/styles`);

const getProductReviewsMeta = (productId) =>
  fetchData(`/reviews/meta?product_id=${productId}`);

export const fetchProductData = async (productId) => {
  try {
    const [productInfo, styleInfo, reviewMeta] = await Promise.all([
      getProductInformation(productId),
      getProductStyles(productId),
      getProductReviewsMeta(productId),
    ]);
    return { productInfo, styleInfo, reviewMeta };
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
};
