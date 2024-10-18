import { useState, useEffect } from 'react';
import { fetchRelatedProductIds } from '../../api.js';

export const useRelatedProducts = (productId) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRelatedProductIds = async () => {
    try {
      setIsLoading(true);
      const data = await fetchRelatedProductIds(productId);
      setRelatedProducts(data);
      setError(null);
    } catch (error) {
      setError('Failed to load related products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getRelatedProductIds();
  }, [productId]);

  return {
    relatedProducts,
    isLoading,
    error,
  };
};
