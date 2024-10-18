import { useState, useEffect } from 'react';
import { fetchRelatedProducts } from '../../api.js';

export const useRelatedProducts = (productId) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      return;
    }

    const getRelatedProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRelatedProducts(productId);
        setRelatedProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching related products:', error);
        setError('Failed to load related products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getRelatedProducts();
  }, [productId]);

  return {
    relatedProducts,
    isLoading,
    error,
  };
};
