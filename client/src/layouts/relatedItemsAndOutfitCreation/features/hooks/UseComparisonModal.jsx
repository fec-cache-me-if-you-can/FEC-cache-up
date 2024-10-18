// useComparisonModal.js
import { useState, useCallback } from 'react';
import { fetchProductInformationById } from '../../api.js';

export const useComparisonModal = (productId) => {
  const [showModal, setShowModal] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});

  const fetchProductDetails = async (relatedProductId, productId) => {
    try {
      const [relatedProductResponse, selectedProductResponse] =
        await Promise.all([
          fetchProductInformationById(relatedProductId),
          fetchProductInformationById(productId),
        ]);
      return {
        relatedProduct: relatedProductResponse,
        selectedProduct: selectedProductResponse,
      };
    } catch (error) {
      console.error('Error fetching product data:', error);
      throw error;
    }
  };

  const handleCardClick = useCallback(
    async (relatedProductId) => {
      const { relatedProduct, selectedProduct } = await fetchProductDetails(
        relatedProductId,
        productId,
      );
      setRelatedProduct(relatedProduct);
      setSelectedProduct(selectedProduct);
      setShowModal(true);
    },
    [productId],
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return {
    showModal,
    relatedProduct,
    selectedProduct,
    handleCardClick,
    handleCloseModal,
  };
};
