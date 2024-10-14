// api.js
import axios from 'axios';

const cache = new Map();

const fetchData = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const { data } = await axios.get(url);
  cache.set(url, data);
  return data;
};

export const getProductInformation = (productId) =>
  fetchData(`/products/${productId}/information`);

export const getProductStyles = (productId) =>
  fetchData(`/products/${productId}/styles`);

export const getProductReviewsMeta = (productId) =>
  fetchData(`/reviews/meta?product_id=${productId}`);
