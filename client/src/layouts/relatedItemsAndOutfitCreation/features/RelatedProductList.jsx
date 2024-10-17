import React from 'react';
import PropTypes from 'prop-types';
import RelatedProductCard from './components/RelatedProductCard.jsx';
import AbstractList from './AbstractList.jsx';
import { useRelatedProducts } from './hooks/useRelatedProducts.jsx';
import ProductComparisonModal from './components/ProductComparisonModal.jsx';
import { useComparisonModal } from './hooks/useComparisonModal.jsx';

const RelatedProductList = ({ productId }) => {
  const { relatedProducts, isLoading, error } = useRelatedProducts(productId);
  const {
    showModal,
    relatedProduct,
    selectedProduct,
    handleCardClick,
    handleCloseModal,
  } = useComparisonModal(productId);

  return (
    <>
      <ProductComparisonModal
        show={showModal}
        onHide={handleCloseModal}
        relatedProduct={relatedProduct}
        selectedProduct={selectedProduct}
      />
      <AbstractList
        items={relatedProducts}
        isLoading={isLoading}
        error={error}
        heading="Related Products"
        CardComponent={RelatedProductCard}
        action={handleCardClick}
      />
    </>
  );
};

RelatedProductList.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default RelatedProductList;
