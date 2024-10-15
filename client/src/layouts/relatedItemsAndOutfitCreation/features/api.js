// api.js
import axios from 'axios';

const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const getProductInformation = (productId) =>
  fetchData(`/products/${productId}/information`);

const getProductStyles = (productId) =>
  fetchData(`/products/${productId}/styles`);

const getProductReviewsMeta = (productId) =>
  fetchData(`/reviews/meta?product_id=${productId}`);

export async function fetchProductData(productId) {
  const [productInfo, styleInfo, reviewMeta] = await Promise.all([
    getProductInformation(productId),
    getProductStyles(productId),
    getProductReviewsMeta(productId),
  ]);
  return { productInfo, styleInfo, reviewMeta };
}
