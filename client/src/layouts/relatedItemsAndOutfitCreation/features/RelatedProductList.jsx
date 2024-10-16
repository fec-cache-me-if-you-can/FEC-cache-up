import React from 'react';
import PropTypes from 'prop-types';
import RelatedProductCard from './components/RelatedProductCard.jsx';
import AbstractList from './AbstractList.jsx';
import { useRelatedProducts } from './hooks/useRelatedProducts.jsx';

const RelatedProductList = ({ productId }) => {
  const { relatedProducts, isLoading, error } = useRelatedProducts(productId);

  return (
    <>
      <AbstractList
        items={relatedProducts.map((id) => String(id))}
        isLoading={isLoading}
        error={error}
        heading="Related Products"
        CardComponent={RelatedProductCard}
        action={() => console.log('RelatedProductList')}
      />
    </>
  );
};

RelatedProductList.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default RelatedProductList;
