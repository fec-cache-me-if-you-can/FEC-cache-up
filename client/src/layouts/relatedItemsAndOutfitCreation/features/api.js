// api.js
import axios from 'axios';

const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const getProductInformation = (productId) =>
  fetchData(`/products/${productId}/information`);

export const getProductStyles = (productId) =>
  fetchData(`/products/${productId}/styles`);

export const getProductReviewsMeta = (productId) =>
  fetchData(`/reviews/meta?product_id=${productId}`);
