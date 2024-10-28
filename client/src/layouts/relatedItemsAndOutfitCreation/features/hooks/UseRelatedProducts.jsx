import { useState, useEffect, useCallback } from 'react';
import { fetchRelatedProductIds } from '../../api.js';

export const useRelatedProducts = (productId) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRelatedProductIds = useCallback(async () => {
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
  }, [productId]);
  useEffect(() => {
    getRelatedProductIds();
  }, [productId, getRelatedProductIds]);

  return {
    relatedProducts,
    isLoading,
    error,
  };
};
