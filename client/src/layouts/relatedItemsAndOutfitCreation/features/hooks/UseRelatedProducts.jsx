import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRelatedProducts = (productId) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRelatedProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/products/${productId}/related`);
      setRelatedProducts(data.map((id) => String(id)));
      setError(null);
    } catch (error) {
      console.error('Error fetching related products:', error);
      setError('Failed to load related products. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [productId]);

  return {
    relatedProducts,
    isLoading,
    error,
  };
};
